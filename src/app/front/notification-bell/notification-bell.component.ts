import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent {
  isOpen = false;
  notifications = [
    { type: 'success', message: 'Nouvel entretien programmé', interview_id: 12, is_read: false },
    { type: 'error', message: 'Entretien annulé', interview_id: null, is_read: false }
  ];
  unreadCount = this.notifications.filter(n => !n.is_read).length;

  constructor(private router: Router) {}

  toggleNotifications() {
    this.isOpen = !this.isOpen;
  }

  viewInterview(interviewId: number) {
    console.log("📡 Redirection vers l'entretien ID :", interviewId);
    this.router.navigate(['/interview', interviewId]);
  }

  markAsRead(notification: any) {
    notification.is_read = true;
    this.unreadCount = this.notifications.filter(n => !n.is_read).length;
  }
}
