import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private stompClient: Client;
  public newNotification = new Subject<{message: string, count: number}>();
    apiUrl: any;

  constructor(private http: HttpClient) {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8083/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.initConnection();
  }

  private initConnection(): void {
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/admin-notifications', (message) => {
        if (message.body) {
          this.handleNotification(message.body);
        }
      });
    };

    this.stompClient.activate();
  }

  private handleNotification(message: string): void {
    try {
      const notification = JSON.parse(message);
      this.newNotification.next({
        message: notification.message || 'Nouvelle réclamation',
        count: notification.count || 1
      });
    } catch (e) {
      console.error('Error parsing notification', e);
    }
  }


  // ➕ Ajoute ceci :
  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>('/api/notifications');
  }

  getUserNotifications(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/users/${userId}/notifications`);
  }

  markAllAsRead(userId: number): Observable<any> {
    return this.http.put(`/api/users/${userId}/notifications/mark-all-read`, {});
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`/api/notifications/${notificationId}/mark-read`, {});
  }
}
