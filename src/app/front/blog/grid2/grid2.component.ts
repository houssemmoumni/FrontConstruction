import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobOfferService } from '../../../services/job-offer.service';
import { NotificationService } from '../../../services/notification.service';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { NotificationModalComponent } from '../../notification-modal/notification-modal.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faBellSlash, faFilter, faSearch, faArrowUp, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { JobOffer } from '../../../models/job-offer.model'; // Import your model

interface AppNotification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
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
    FontAwesomeModule,
    DatePipe
  ],
  templateUrl: './grid2.component.html',
  styleUrls: ['./grid2.component.css']
})
export class Grid2Component implements OnInit, OnDestroy {
  private library = inject(FaIconLibrary);
  
  // Icons
  faBell = faBell;
  farBell = farBell;
  faBellSlash = faBellSlash;
  faFilter = faFilter;
  faSearch = faSearch;
  faArrowUp = faArrowUp;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  // Banner configuration
  banner = {
    pagetitle: "Offres d'Emploi",
    bg_image: "https://www.designfreelogoonline.com/wp-content/uploads/2022/05/2022-Construction-Logo-Design-Ideas-e1715584728895.jpg",
    title: "Découvrez nos Offres d'Emploi",
  };

  // Layout configuration
  layout = {
    sidebar: false,
    sidebarPosition: "",
    gridClass: "col-lg-4 col-md-6"
  };

  // Data properties
  blogList: JobOffer[] = [];
  displayedBlogs: JobOffer[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  searchQuery = '';

  // Notification properties
  notifications: AppNotification[] = [];
  showNotifications = false;
  unreadNotificationsCount = 0;
  private notificationSub!: Subscription;

  constructor(
    private jobOfferService: JobOfferService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.library.addIcons(faBell, farBell, faBellSlash, faFilter, faSearch, faArrowUp, faArrowRight, faArrowLeft);
  }

  ngOnInit(): void {
    this.fetchPublishedJobOffers();
    this.setupRealTimeNotifications();
  }

  ngOnDestroy(): void {
    this.notificationSub?.unsubscribe();
  }

  private setupRealTimeNotifications(): void {
    this.notificationSub = this.notificationService.getNotifications().subscribe({
      next: (notifications: AppNotification[]) => {
        this.notifications = notifications;
        this.updateUnreadCount();
      },
      error: (err) => console.error('Error loading notifications:', err)
    });
  }

  private updateUnreadCount(): void {
    this.unreadNotificationsCount = this.notifications.filter(n => !n.is_read).length;
  }

  fetchPublishedJobOffers(): void {
    this.jobOfferService.getJobOffers().subscribe({
      next: (data: JobOffer[]) => {
        this.blogList = data.filter(offer => offer.publish)
          .map(offer => ({
            ...offer,
            postedDate: offer.postedDate || new Date().toISOString(),
            image: offer.image || 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/we-are-hiring-design-template-464aabfc96818f497a51d4c58ee68006_screen.jpg?ts=1630408833'
          }));
        this.updateDisplayedBlogs();
      },
      error: (err) => console.error('Error fetching job offers:', err)
    });
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
    this.scrollToTop();
  }

  get totalPages(): number {
    return Math.ceil(this.blogList.length / this.itemsPerPage);
  }

  get pages(): number[] {
    const pageCount = this.totalPages;
    if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => i + 1);

    let pages: number[] = [];
    if (this.currentPage <= 3) {
      pages = [1, 2, 3, 4, pageCount];
    } else if (this.currentPage >= pageCount - 2) {
      pages = [1, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
    } else {
      pages = [1, this.currentPage - 1, this.currentPage, this.currentPage + 1, pageCount];
    }

    return pages;
  }

  filterByDate(range: string): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredList = [...this.blogList];

    switch (range) {
      case 'today':
        filteredList = filteredList.filter(offer => {
          const offerDate = new Date(offer.postedDate || new Date());
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
          const offerDate = new Date(offer.postedDate || new Date());
          return offerDate >= startOfWeek && offerDate <= endOfWeek;
        });
        break;

      case 'thisMonth':
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        filteredList = filteredList.filter(offer => {
          const offerDate = new Date(offer.postedDate || new Date());
          return offerDate >= startOfMonth && offerDate <= endOfMonth;
        });
        break;

      case 'thisYear':
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);

        filteredList = filteredList.filter(offer => {
          const offerDate = new Date(offer.postedDate || new Date());
          return offerDate >= startOfYear && offerDate <= endOfYear;
        });
        break;
    }

    this.displayedBlogs = filteredList.slice(0, this.itemsPerPage);
    this.currentPage = 1;
  }

  applySearchFilter(): void {
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      this.displayedBlogs = this.blogList.filter(offer =>
        (offer.title?.toLowerCase().includes(query) ||
        offer.description?.toLowerCase().includes(query))
      ).slice(0, this.itemsPerPage);
    } else {
      this.updateDisplayedBlogs();
    }
    this.currentPage = 1;
  }

  toggleNotifications(event: Event): void {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.markVisibleNotificationsAsRead();
    }
  }

  private markVisibleNotificationsAsRead(): void {
    const unreadNotifications = this.notifications.filter(n => !n.is_read);
    if (unreadNotifications.length > 0) {
      this.notificationService.markAllAsRead(1).subscribe({
        next: () => {
          this.notifications.forEach(n => n.is_read = true);
          this.updateUnreadCount();
        },
        error: (err) => console.error('Error marking notifications as read:', err)
      });
    }
  }

  markAllAsRead(event: Event): void {
    event.stopPropagation();
    this.markVisibleNotificationsAsRead();
  }

  openNotificationModal(notification: AppNotification): void {
    this.dialog.open(NotificationModalComponent, {
      width: '500px',
      data: { notification }
    });
  }

  private scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  scroll_top(): void {
    this.scrollToTop();
  }
}