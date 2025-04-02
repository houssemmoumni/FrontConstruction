import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService, Notification } from '../services/websocket.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-notifications',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-card class="notification-card">
      <mat-card-header>
        <mat-card-title>
          <mat-icon>notifications</mat-icon>
          Incident Notifications
          <mat-spinner *ngIf="!isConnected" diameter="24"></mat-spinner>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          <mat-list-item *ngFor="let notification of notifications" class="notification-item">
            <mat-icon matListItemIcon>warning</mat-icon>
            <div matListItemTitle>
              {{ notification.message }}
              <span class="severity-badge {{notification.severity?.toLowerCase()}}">
                {{ notification.severity }}
              </span>
            </div>
            <div matListItemLine>
              {{ notification.notificationDate | date:'medium' }}
            </div>
          </mat-list-item>
          <mat-list-item *ngIf="notifications.length === 0">
            <p>No new notifications</p>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .notification-card { max-width: 800px; margin: 1rem auto; }
    .notification-item {
      border-left: 4px solid;
      border-color: var(--severity-color, #ccc);
      margin-bottom: 8px;
      padding: 12px;
    }
    .severity-badge {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin-left: 8px;
      display: inline-block;
    }
    .low {
      --severity-color: #4caf50;
      background-color: #e8f5e9;
      color: #2e7d32;
    }
    .medium {
      --severity-color: #ff9800;
      background-color: #fff3e0;
      color: #e65100;
    }
    .high {
      --severity-color: #f44336;
      background-color: #ffebee;
      color: #c62828;
    }
    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class AdminNotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  isConnected = false;
  private notificationSub: Subscription = new Subscription();
  private connectionSub: Subscription = new Subscription();

  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    this.connectionSub = this.wsService.getConnectionStatus().subscribe(
      status => this.isConnected = status
    );

    this.notificationSub = this.wsService.getNotifications().subscribe({
      next: (notification) => {
        if (notification) {
          this.notifications.unshift(notification);
        }
      },
      error: (err) => {
        console.error('Notification error:', err);
        this.isConnected = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
    this.connectionSub.unsubscribe();
  }
}
