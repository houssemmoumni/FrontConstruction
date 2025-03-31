// src/app/services/incident-notification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentNotification } from '../models/incident-notification.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentNotificationService {
  private apiUrl = 'http://localhost:8065/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<IncidentNotification[]> {
    return this.http.get<IncidentNotification[]>(`${this.apiUrl}/user/${userId}`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${notificationId}/read`, {});
  }
}
