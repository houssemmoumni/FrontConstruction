import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private stompClient!: Client;
  private notificationSubject = new BehaviorSubject<Notification[]>([]);
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();
  private readonly apiUrl = 'http://localhost:8060/api/notifications';
  private readonly wsEndpoint = 'http://localhost:8060/ws';

  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
    this.loadInitialNotifications();
  }

  private initializeWebSocketConnection(): void {
    try {
      const socket = new SockJS(this.wsEndpoint);

      this.stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => console.log('STOMP:', str),
        onConnect: () => {
          this.connectionStatus.next(true);
          this.subscribeToTopics();
        },
        onStompError: (frame) => {
          console.error('Broker reported error:', frame.headers['message']);
          this.connectionStatus.next(false);
        },
        onDisconnect: () => {
          this.connectionStatus.next(false);
        }
      });

      this.stompClient.activate();
    } catch (error) {
      console.error('WebSocket initialization error:', error);
      this.connectionStatus.next(false);
    }
  }

  private subscribeToTopics(): void {
    this.stompClient.subscribe('/topic/notifications', (message: IMessage) => {
      try {
        const notification: Notification = JSON.parse(message.body);
        const currentNotifications = this.notificationSubject.value;
        this.notificationSubject.next([notification, ...currentNotifications]);
      } catch (error) {
        console.error('Error parsing notification:', error, message.body);
      }
    });

    this.stompClient.subscribe('/topic/application-notifications', (message: IMessage) => {
      try {
        const notification: Notification = JSON.parse(message.body);
        const currentNotifications = this.notificationSubject.value;
        this.notificationSubject.next([notification, ...currentNotifications]);
      } catch (error) {
        console.error('Error parsing application notification:', error, message.body);
      }
    });
  }

  private loadInitialNotifications(): void {
    this.http.get<Notification[]>(this.apiUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (notifications) => {
          this.notificationSubject.next(notifications);
        },
        error: (err) => {
          console.error('Failed to load initial notifications:', err);
        }
      });
  }

  getNotifications(): Observable<Notification[]> {
    return this.notificationSubject.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${notificationId}/read`, {})
      .pipe(takeUntil(this.destroy$));
  }

  markAllAsRead(userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/read-all/${userId}`, {})
      .pipe(takeUntil(this.destroy$));
  }

  clearAllNotifications(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear-all/${userId}`)
      .pipe(takeUntil(this.destroy$));
  }

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
