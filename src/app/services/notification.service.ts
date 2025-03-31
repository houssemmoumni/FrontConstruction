import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:8060/api/notifications';

  constructor(private http: HttpClient) {}

  // Récupère toutes les notifications
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  // Récupère les notifications par ID de candidat
  getNotificationsByCandidateId(candidateId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/candidate/${candidateId}`);
  }

  // Marque une notification comme lue
  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${notificationId}/read`, {});
  }
}
