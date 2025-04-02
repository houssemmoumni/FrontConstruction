import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs';
import  SockJS from 'sockjs-client';

export interface Notification {
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  reporterName: string;
  projectId: number;
  notificationDate: string | Date;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private stompClient: Client;
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  private connectionStatus = new BehaviorSubject<boolean>(false);
  private readonly endpoint = 'http://localhost:8065/ws-notifications';

  constructor() {
    this.stompClient = new Client();
    this.initializeConnection();
  }

  private initializeConnection(): void {
    try {
      const socket = new SockJS(this.endpoint);

      this.stompClient.configure({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => console.log('STOMP:', str),
        onConnect: (frame) => {
          this.connectionStatus.next(true);
          console.log('Connected to WebSocket');

          this.stompClient.subscribe('/topic/notifications', (message: IMessage) => {
            try {
              const notification: Notification = JSON.parse(message.body);
              this.notificationSubject.next({
                ...notification,
                notificationDate: new Date(notification.notificationDate)
              });
            } catch (error) {
              console.error('Error parsing notification:', error);
            }
          });
        },
        onStompError: (frame) => {
          console.error('Broker reported error:', frame.headers['message']);
          this.connectionStatus.next(false);
        },
        onWebSocketError: (error) => {
          console.error('WebSocket connection error:', error);
          this.connectionStatus.next(false);
        }
      });

      this.stompClient.activate();
    } catch (error) {
      console.error('WebSocket initialization error:', error);
      this.connectionStatus.next(false);
    }
  }

  public sendIncidentNotification(incidentData: {
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    reporterName: string;
    projectId: number;
  }): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/incident',
        body: JSON.stringify(incidentData),
        headers: { 'content-type': 'application/json' }
      });
    } else {
      console.warn('Not connected - message not sent');
    }
  }

  public getNotifications(): Observable<Notification | null> {
    return this.notificationSubject.asObservable();
  }

  public getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus.asObservable();
  }

  public disconnect(): void {
    if (this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }
}
