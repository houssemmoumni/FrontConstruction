import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobOfferService } from '../../../services/job-offer.service';
import { NotificationService } from '../../../services/notification.service';
import { Subscription } from 'rxjs';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NotificationModalComponent } from '../../notification-modal/notification-modal.component';

interface AppNotification {
  id: number;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  application_id?: number;
  interview_id?: number;
  status?: string;
  job_title?: string;
  job_offer_id?: number;
}

@Component({
  selector: 'app-grid2',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    HeaderLight3Component,
    Banner1Component,
    Footer13Component,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './grid2.component.html',
  styleUrls: ['./grid2.component.css']
})
export class Grid2Component implements OnInit, OnDestroy {
  banner: any = {
    pagetitle: "Offres d'Emploi",
    bg_image: "assets/images/banner/bnr1.jpg",
    title: "Découvrez nos Offres d'Emploi",
  };

  layout: any = {
    sidebar: false,
    sidebarPosition: "",
    gridClass: "col-lg-4 col-md-6"
  };

  blogList: any[] = [];
  displayedBlogs: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 2;
  searchQuery: string = '';
  selectedItem: any = null;

  notifications: AppNotification[] = [];
  showNotifications: boolean = false;
  unreadNotificationsCount: number = 0;
  private notificationSub!: Subscription;
  private destroy$ = new Subscription();

  constructor(
    public jobOfferService: JobOfferService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchPublishedJobOffers();
    this.setupRealTimeNotifications();
    this.loadInitialNotifications();
  }

  ngOnDestroy(): void {
    this.notificationSub?.unsubscribe();
    this.destroy$.unsubscribe();
  }

  private setupRealTimeNotifications(): void {
    this.notificationSub = this.notificationService.getNotifications().subscribe({
      next: (notifications: any[]) => {
        this.notifications = notifications.map(notification => ({
          id: notification.id,
          type: this.determineNotificationType(notification),
          message: this.formatNotificationMessage(notification),
          is_read: notification.is_read || false,
          created_at: notification.created_at,
          application_id: notification.application_id,
          interview_id: notification.interview_id,
          status: notification.status,
          job_title: notification.job_title,
          job_offer_id: notification.job_offer_id
        }));
        this.updateUnreadCount();

        const newUnread = notifications.filter(n => !n.is_read);
        if (newUnread.length > 0) {
          newUnread.forEach(notification => {
            this.showNotificationToast(notification);
          });
        }
      }
    });
  }

  private determineNotificationType(notification: any): string {
    if (notification.status === 'REJECTED') return 'rejected';
    if (notification.status === 'ACCEPTED') return 'accepted';
    if (notification.interview_id) return 'interview';
    return 'info';
  }

  private formatNotificationMessage(notification: any): string {
    if (notification.status === 'REJECTED') {
      return `Votre candidature a été rejetée pour le poste ${notification.job_title || ''}`;
    }
    if (notification.status === 'ACCEPTED') {
      return `Félicitations! Votre candidature pour ${notification.job_title || ''} a été acceptée`;
    }
    if (notification.interview_id) {
      return `Nouvel entretien programmé pour ${notification.job_title || ''}`;
    }
    return notification.message || 'Nouvelle notification';
  }

  private loadInitialNotifications(): void {
    this.destroy$.add(
      this.notificationService.getUserNotifications(1).subscribe({
        next: (notifications: any[]) => {
          this.notifications = notifications.map(notification => ({
            id: notification.id,
            type: this.determineNotificationType(notification),
            message: this.formatNotificationMessage(notification),
            is_read: notification.is_read || false,
            created_at: notification.created_at,
            application_id: notification.application_id,
            interview_id: notification.interview_id,
            status: notification.status,
            job_title: notification.job_title,
            job_offer_id: notification.job_offer_id
          }));
          this.updateUnreadCount();
        }
      })
    );
  }

  private showNotificationToast(notification: AppNotification): void {
    const toastRef = this.snackBar.open(notification.message, 'Voir', {
      duration: 5000,
      panelClass: ['notification-snackbar'],
      verticalPosition: 'top'
    });

    toastRef.onAction().subscribe(() => {
      this.openNotificationModal(notification);
    });
  }

  openNotificationModal(notification: AppNotification): void {
    this.dialog.open(NotificationModalComponent, {
      width: '500px',
      data: {
        notification: notification
      }
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.markVisibleNotificationsAsRead();
    }
  }

  private markVisibleNotificationsAsRead(): void {
    const unreadNotifications = this.notifications.filter(n => !n.is_read);
    if (unreadNotifications.length > 0) {
      this.destroy$.add(
        this.notificationService.markAllAsRead(1).subscribe({
          next: () => {
            this.notifications.forEach(n => n.is_read = true);
            this.updateUnreadCount();
          }
        })
      );
    }
  }

  markAsRead(notification: AppNotification): void {
    if (!notification.is_read) {
      this.destroy$.add(
        this.notificationService.markAsRead(notification.id).subscribe({
          next: () => {
            notification.is_read = true;
            this.updateUnreadCount();
          }
        })
      );
    }
  }

  markAllAsRead(): void {
    const unreadNotifications = this.notifications.filter(n => !n.is_read);
    if (unreadNotifications.length > 0) {
      this.destroy$.add(
        this.notificationService.markAllAsRead(1).subscribe({
          next: () => {
            this.notifications.forEach(n => n.is_read = true);
            this.unreadNotificationsCount = 0;
          }
        })
      );
    }
  }

  private updateUnreadCount(): void {
    this.unreadNotificationsCount = this.notifications.filter(n => !n.is_read).length;
  }

  fetchPublishedJobOffers() {
    this.destroy$.add(
      this.jobOfferService.getJobOffers().subscribe({
        next: (data) => {
          this.blogList = data.filter(offer => offer.publish);
          this.updateDisplayedBlogs();
        }
      })
    );
  }

  private updateDisplayedBlogs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedBlogs = this.blogList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedBlogs();
  }

  get totalPages(): number {
    return Math.ceil(this.blogList.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  filterByDate(range: string): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredList = this.blogList.slice();

    switch (range) {
      case 'today':
        filteredList = filteredList.filter(offer => {
          const offerDate = new Date(offer.postedDate);
          offerDate.setHours(0, 0, 0, 0);
          return offerDate.getTime() === today.getTime();
        });
        break;

      case 'thisWeek':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

        filteredList = filteredList.filter(offer => {
          const offerDate = new Date(offer.postedDate);
          return offerDate >= startOfWeek && offerDate <= endOfWeek;
        });
        break;

      case 'thisMonth':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        filteredList = filteredList.filter(offer => {
          const offerDate = new Date(offer.postedDate);
          return offerDate >= startOfMonth && offerDate <= endOfMonth;
        });
        break;

      case 'thisYear':
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);

        filteredList = filteredList.filter(offer => {
          const offerDate = new Date(offer.postedDate);
          return offerDate >= startOfYear && offerDate <= endOfYear;
        });
        break;

      default:
        break;
    }

    this.displayedBlogs = filteredList.slice(0, this.itemsPerPage);
    this.currentPage = 1;
  }

  applySearchFilter(): void {
    if (this.searchQuery) {
      this.blogList = this.blogList.filter(offer =>
        offer.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        offer.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchPublishedJobOffers();
    }
    this.currentPage = 1;
    this.updateDisplayedBlogs();
  }

  showFullDescription(item: any): void {
    this.selectedItem = this.selectedItem === item ? null : item;
  }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
