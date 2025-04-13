import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { NotificationDTO } from '../models/notification-dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private stompClient!: Stomp.Client;
  private notificationSubject = new Subject<NotificationDTO>();
  private connectionStatusSubject = new Subject<boolean>();

  notification$ = this.notificationSubject.asObservable();
  connectionStatus$ = this.connectionStatusSubject.asObservable();

  constructor() {
    this.initializeConnection();
  }

  private initializeConnection(): void {
    const socket = new SockJS('http://localhost:8051/ws');
    this.stompClient = new Stomp.Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log('STOMP: ' + str),
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.connectionStatusSubject.next(true);
      this.subscribeToNotifications();
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      this.connectionStatusSubject.next(false);
    };

    this.stompClient.onWebSocketClose = () => {
      console.log('WebSocket connection closed');
      this.connectionStatusSubject.next(false);
    };

    this.stompClient.activate();
  }

  private subscribeToNotifications(): void {
    this.stompClient.subscribe('/topic/notifications', (message) => {
      try {
        const notification: NotificationDTO = JSON.parse(message.body);
        this.notificationSubject.next(notification);
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    });
  }

  disconnect(): void {
    if (this.stompClient?.connected) {
      this.stompClient.deactivate().then(() => {
        console.log('Disconnected gracefully');
      });
    }
  }

  // Optional: Manual reconnect if needed
  reconnect(): void {
    if (!this.stompClient?.connected) {
      this.initializeConnection();
    }
  
  }}
