import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent implements OnInit {
  isOpen = false;
  notifications: Notification[] = [];
  unreadCount = 0;

  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  toggleNotifications() {
    this.isOpen = !this.isOpen;
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(
      (data: Notification[]) => {
        console.log("🔔 Notifications récupérées :", data);
        this.notifications = data;
        this.unreadCount = this.notifications.filter(n => !n.is_read).length;
      },
      (error: any) => {
        console.error("❌ Erreur lors de la récupération des notifications :", error);
      }
    );
  }

  viewInterview(notification: Notification) {
    const applicationId = notification.applicationId; // Utilisez applicationId pour rediriger vers les entretiens
    if (applicationId) {
      console.log("📡 Redirection vers les entretiens de la candidature ID :", applicationId);
      this.router.navigate(['/interviews/candidate', applicationId]);
    } else {
      console.warn("⚠️ Aucun ID de candidature valide trouvé dans la notification.");
    }
  }
  markAsRead(notification: Notification) {
    if (!notification.is_read) {
      this.notificationService.markAsRead(notification.id).subscribe(() => {
        notification.is_read = true;
        this.unreadCount = this.notifications.filter(n => !n.is_read).length;
      });
    }
  }
}
