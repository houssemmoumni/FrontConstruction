import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private stompClient!: Client;
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private readonly endpoint = 'http://localhost:8065/ws-notifications';
  private readonly apiUrl = 'http://localhost:8065/api/notifications';

  constructor(private http: HttpClient) {
    this.initializeConnection();
  }

  private initializeConnection(): void {
    try {
      const socket = new SockJS(this.endpoint);
      this.stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => console.log('STOMP:', str),
        onConnect: () => {
          this.connectionStatus.next(true);
          this.subscribeToNotifications();
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

  private subscribeToNotifications(): void {
    if (!this.stompClient.connected) return;

    this.stompClient.subscribe('/topic/notifications', (message: IMessage) => {
      try {
        const payload = JSON.parse(message.body);
        console.log('Raw notification payload:', payload);

        // Determine the source based on payload content
        const source = payload.incident ? 'incident' : 'incidentReport';
        const incidentData = payload.incident || payload.incidentReport;

        const notification: Notification = {
          id: payload.id || 0,
          message: payload.message || 'New incident reported',
          notification_date: this.normalizeDate(payload.notification_date || new Date()),
          is_read: payload.is_read || false,
          severity: payload.severity || 'MEDIUM',
          receiverId: payload.receiverId || 0,
          source: source, // Include the required source property
          incident: incidentData ? {
            id: incidentData.id,
            description: incidentData.description || '',
            reportDate: this.normalizeDate(incidentData.reportDate),
            status: incidentData.status || 'DECLARED',
            severity: incidentData.severity || 'MEDIUM',
            reporterName: incidentData.reporterName || 'Anonymous',
            projectId: incidentData.projectId || 0,
            projectName: incidentData.projectName || 'Unknown Project'
          } : undefined,
          incidentReport: source === 'incidentReport' ? incidentData : undefined
        };

        console.log('Processed notification:', notification);
        this.notificationSubject.next(notification);
      } catch (error) {
        console.error('Error processing notification:', error, message.body);
      }
    });
  }

  private normalizeDate(date: any): string {
    if (!date) return new Date().toISOString();
    if (typeof date === 'string') return date;
    if (date instanceof Date) return date.toISOString();
    try {
      const parsed = new Date(date);
      return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  getNotifications(): Observable<Notification | null> {
    return this.notificationSubject.asObservable();
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}`).pipe(
      map((notifs: Notification[]) => notifs.map((n: Notification) => ({
        ...n,
        notification_date: this.normalizeDate(n.notification_date),
        incident: n.incident ? {
          ...n.incident,
          reportDate: this.normalizeDate(n.incident.reportDate)
        } : undefined
      }))
    ));
  }

  getUnreadNotifications(receiverId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/unread/${receiverId}`).pipe(
      map((notifs: Notification[]) => notifs.map((n: Notification) => ({
        ...n,
        notification_date: this.normalizeDate(n.notification_date),
        incident: n.incident ? {
          ...n.incident,
          reportDate: this.normalizeDate(n.incident.reportDate)
        } : undefined
      }))
    ));
  }

  markAsRead(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/read`, {});
  }

  markAllAsRead(receiverId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/read-all/${receiverId}`, {});
  }

  clearAllNotifications(receiverId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear-all/${receiverId}`);
  }

  disconnect(): void {
    if (this.stompClient?.connected) {
      this.stompClient.deactivate();
    }
  }
}
