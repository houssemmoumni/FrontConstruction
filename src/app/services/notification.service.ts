// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:8060/api/notifications'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Récupère les notifications depuis le backend
  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Marque une notification comme lue
  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${notificationId}/read`, {});
  }
}
