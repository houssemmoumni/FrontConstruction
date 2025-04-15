// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { NotificationService } from '../services/notification.service';
// import { Subscription } from 'rxjs';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTooltip } from '@angular/material/tooltip';
// import { MatButtonModule } from '@angular/material/button';
// @Component({
//   selector: 'app-notifications',
//   imports: [CommonModule  , MatButtonModule,MatTooltip],
//   templateUrl: './notifications.component.html',
//   styleUrls: ['./notifications.component.scss']
// })
// export class NotificationsComponent implements OnInit, OnDestroy {
//     notifications: any[] = [];
//     unreadCount = 0;
//     showNotifications = false;
//     isConnected = false;
//     private subs: Subscription[] = [];

//     constructor(private notificationService: NotificationService) {}

//     ngOnInit(): void {
//       this.subs.push(
//         this.notificationService.notification$.subscribe({
//           next: (notification) => {
//             this.handleNewNotification(notification);
//           },
//           error: (err) => console.error('Notification error:', err)
//         }),

//         this.notificationService.connectionStatus$.subscribe({
//           next: (status) => {
//             this.isConnected = status;
//             if (status) {
//               console.log('WebSocket connected');
//             }
//           },
//           error: (err) => console.error('Connection status error:', err)
//         })
//       );
//     }

//     private handleNewNotification(notification: any): void {
//       this.notifications.unshift({
//         ...notification,
//         timestamp: new Date()
//       });

//       if (!this.showNotifications) {
//         this.unreadCount++;
//       }
//     }

//     toggleNotifications(): void {
//       this.showNotifications = !this.showNotifications;
//       if (this.showNotifications) {
//         this.unreadCount = 0;
//       }
//     }

//     requestNotificationPermission(): void {
//       if ('Notification' in window) {
//         Notification.requestPermission().then(permission => {
//           if (permission === 'granted') {
//             console.log('Notification permission granted');
//           }
//         });
//       }
//     }

//     ngOnDestroy(): void {
//       this.subs.forEach(sub => sub.unsubscribe());
//     }
//   }
