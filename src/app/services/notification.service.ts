import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Client, IMessage } from '@stomp/stompjs';
import  SockJS from 'sockjs-client';
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
  private retryCount = 0;
  private maxRetries = 5;

  constructor(private http: HttpClient) {
    this.initializeWebSocketConnection();
    this.loadInitialNotifications();
  }

  private initializeWebSocketConnection(): void {
    if (this.retryCount >= this.maxRetries) return;

    try {
      const socket = new SockJS(this.wsEndpoint);

      this.stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => console.log('STOMP:', str),
        onConnect: () => {
          this.retryCount = 0;
          this.connectionStatus.next(true);
          this.subscribeToTopics();
        },
        onStompError: (frame) => {
          this.handleConnectionError();
        },
        onWebSocketError: (error) => {
          this.handleConnectionError();
        },
        onDisconnect: () => {
          this.connectionStatus.next(false);
          this.scheduleReconnection();
        }
      });

      this.stompClient.activate();
    } catch (error) {
      this.handleConnectionError();
    }
  }

  private handleConnectionError(): void {
    this.connectionStatus.next(false);
    this.scheduleReconnection();
  }

  private scheduleReconnection(): void {
    this.retryCount++;
    if (this.retryCount <= this.maxRetries) {
      const delay = Math.min(5000 * this.retryCount, 30000);
      setTimeout(() => this.initializeWebSocketConnection(), delay);
    }
  }

  private subscribeToTopics(): void {
    if (!this.stompClient.connected) return;

    const notificationSubscription = this.stompClient.subscribe(
      '/topic/notifications',
      (message: IMessage) => this.handleNotification(message)
    );

    const appNotificationSubscription = this.stompClient.subscribe(
      '/topic/application-notifications',
      (message: IMessage) => this.handleNotification(message)
    );}

  private handleNotification(message: IMessage): void {
    try {
      const notification: Notification = JSON.parse(message.body);
      const currentNotifications = this.notificationSubject.value;
      this.notificationSubject.next([notification, ...currentNotifications]);
    } catch (error) {
      console.error('Error parsing notification:', message.body);
    }
  }

  private loadInitialNotifications(): void {
    this.http.get<Notification[]>(this.apiUrl)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => of([]))
      )
      .subscribe(notifications => {
        this.notificationSubject.next(notifications);
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

  sendNotification(notification: Partial<Notification>): void {
    if (this.stompClient?.connected) {
      this.stompClient.publish({
        destination: '/app/notify',
        body: JSON.stringify(notification),
        headers: { 'content-type': 'application/json' }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}