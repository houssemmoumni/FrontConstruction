import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { WebSocketService } from '../services/websocket.service';
import { IncidentService } from '../services/incident.service';
import { Subscription } from 'rxjs';
import { AssignIncidentComponent } from '../assign-incident/assign-incident.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from '../models/incident.model';

@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatTooltipModule,
    DatePipe
  ],
  templateUrl: './admin-notifications.component.html',
  styleUrls: ['./admin-notifications.component.scss']
})
export class AdminNotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  unreadCount = 0;
  isConnected = false;
  private notificationSub!: Subscription;
  private connectionSub!: Subscription;

  constructor(
    private wsService: WebSocketService,
    private incidentService: IncidentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.setupWebSocket();
  }

  ngOnDestroy(): void {
    this.notificationSub?.unsubscribe();
    this.connectionSub?.unsubscribe();
  }

  private loadNotifications(): void {
    const receiverId = 1; // Admin user ID
    this.wsService.getUserNotifications(receiverId).subscribe({
      next: (notifs) => {
        this.notifications = notifs;
        this.updateUnreadCount();
      },
      error: (err) => {
        console.error('Error loading notifications:', err);
      }
    });
  }

  private setupWebSocket(): void {
    this.connectionSub = this.wsService.getConnectionStatus().subscribe(
      status => this.isConnected = status
    );

    this.notificationSub = this.wsService.getNotifications().subscribe({
      next: (notification) => {
        if (notification) {
          this.notifications.unshift(notification);
          this.updateUnreadCount();
          this.snackBar.open('New incident received', 'View', {
            duration: 3000
          }).onAction().subscribe(() => {
            this.handleNotificationClick(notification);
          });
        }
      },
      error: (err) => {
        console.error('WebSocket error:', err);
      }
    });
  }

  private updateUnreadCount(): void {
    this.unreadCount = this.notifications.filter(n => !n.is_read).length;
  }

  handleNotificationClick(notification: Notification): void {
    if (!notification.incident && !notification.incidentReport) {
      this.snackBar.open('No incident data available', 'Close', { duration: 3000 });
      return;
    }

    const incidentData = notification.incident || notification.incidentReport;

    if (!incidentData?.id) {
      this.snackBar.open('Invalid incident data', 'Close', { duration: 3000 });
      return;
    }

    this.dialog.open(AssignIncidentComponent, {
      width: '600px',
      data: { incident: incidentData }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.markAsRead(notification);
      }
    });
  }

  markAsRead(notification: Notification): void {
    if (!notification.is_read && notification.id) {
      this.wsService.markAsRead(notification.id).subscribe({
        next: () => {
          notification.is_read = true;
          this.updateUnreadCount();
        },
        error: (err) => {
          console.error('Error marking as read:', err);
          this.snackBar.open('Failed to mark as read', 'Close', { duration: 3000 });
        }
      });
    }
  }

  markAllAsRead(): void {
    const receiverId = 1;
    this.wsService.markAllAsRead(receiverId).subscribe({
      next: () => {
        this.notifications.forEach(n => n.is_read = true);
        this.unreadCount = 0;
      },
      error: (err) => {
        console.error('Error marking all as read:', err);
        this.snackBar.open('Failed to mark all as read', 'Close', { duration: 3000 });
      }
    });
  }

  clearAll(): void {
    const receiverId = 1;
    this.wsService.clearAllNotifications(receiverId).subscribe({
      next: () => {
        this.notifications = [];
        this.unreadCount = 0;
      },
      error: (err) => {
        console.error('Error clearing notifications:', err);
        this.snackBar.open('Failed to clear notifications', 'Close', { duration: 3000 });
      }
    });
  }

  getSeverityIcon(severity: string): string {
    switch(severity?.toUpperCase()) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      default: return 'notifications';
    }
  }
}   
