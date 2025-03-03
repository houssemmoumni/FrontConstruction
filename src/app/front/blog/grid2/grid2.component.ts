import { Component, OnInit } from '@angular/core';
import { JobOfferService } from '../../../services/job-offer.service';
import { CandidateService } from '../../../services/candidate.service';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './grid2.component.html',
  styleUrls: ['./grid2.component.css']
})
export class Grid2Component implements OnInit {
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
  notifications: any[] = []; // Liste des notifications
  showNotifications: boolean = false; // Contrôle l'affichage de la boîte de notifications
  unreadNotificationsCount: number = 0; // Nombre de notifications non lues

  constructor(
    public jobOfferService: JobOfferService,
    private candidateService: CandidateService
  ) { }

  ngOnInit(): void {
    this.fetchPublishedJobOffers();
    this.checkApplicationStatus(); // Vérifiez le statut des candidatures
  }

  fetchPublishedJobOffers() {
    this.jobOfferService.getJobOffers().subscribe({
      next: (data) => {
        this.blogList = data.filter(offer => offer.publish);
        this.updateDisplayedBlogs();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des offres publiées :', error);
      }
    });
  }

  checkApplicationStatus() {
    const candidateId = 1; // Remplacez par l'ID du candidat connecté
    this.candidateService.getAllApplications().subscribe({
      next: (applications) => {
        applications.forEach(application => {
          if (application.status === 'ACCEPTED') {
            this.notifications.push({
              type: 'success',
              message: `Félicitations ! Vous avez été accepté pour l'offre "${application.jobOffer.title}".`,
              link: `/interview/${application.id}`, // Lien vers l'entretien
              read: false // Marquer comme non lu
            });
          } else if (application.status === 'REJECTED') {
            this.notifications.push({
              type: 'error',
              message: `Malheureusement, votre candidature pour l'offre "${application.jobOffer.title}" a été rejetée.`,
              link: '', // Pas de lien pour un rejet
              read: false // Marquer comme non lu
            });
          }
        });
        this.updateUnreadNotificationsCount(); // Mettre à jour le nombre de notifications non lues
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des candidatures :', error);
      }
    });
  }

  // Met à jour le nombre de notifications non lues
  updateUnreadNotificationsCount() {
    this.unreadNotificationsCount = this.notifications.filter(n => !n.read).length;
  }

  // Ouvre ou ferme la boîte de notifications
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  // Marque une notification comme lue
  markAsRead(notification: any) {
    notification.read = true;
    this.updateUnreadNotificationsCount(); // Mettre à jour le compteur après avoir marqué comme lu
  }

  updateDisplayedBlogs(): void {
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
        offer.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchPublishedJobOffers();
    }
    this.currentPage = 1;
    this.updateDisplayedBlogs();
  }

  showFullDescription(item: any): void {
    if (this.selectedItem === item) {
      this.selectedItem = null;
    } else {
      this.selectedItem = item;
    }
  }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
