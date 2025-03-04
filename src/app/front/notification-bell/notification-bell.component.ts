// src/app/front/notification-bell/notification-bell.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service'; // Service pour récupérer les notifications

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css'],
})
export class NotificationBellComponent implements OnInit {
  notifications: any[] = []; // Liste des notifications
  isOpen: boolean = false; // Contrôle l'état de la boîte déroulante

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  // Charge les notifications depuis le backend
  loadNotifications() {
    this.notificationService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications', error);
      }
    );
  }

  // Ouvre ou ferme la boîte de notifications
  toggleNotifications() {
    this.isOpen = !this.isOpen;
  }

  // Retourne le nombre de notifications non lues
  get unreadCount(): number {
    return this.notifications.filter((n) => !n.is_read).length;
  }

  // Marque une notification comme lue
  markAsRead(notification: any) {
    this.notificationService.markAsRead(notification.id).subscribe(
      () => {
        notification.is_read = true; // Met à jour la propriété is_read
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la notification', error);
      }
    );
  }
}
