import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobOfferService } from '../../../services/job-offer.service';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { MatMenuModule } from '@angular/material/menu'; // Pour mat-menu
import { MatButtonModule } from '@angular/material/button'; // Pour mat-button

@Component({
  selector: 'app-grid2',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    RouterLink,
    HeaderLight3Component,
    Banner1Component,
    Footer13Component,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
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

  blogList: any[] = []; // Liste complète des offres d'emploi
  displayedBlogs: any[] = []; // Liste des offres affichées sur la page actuelle
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 2; // Nombre d'offres par page
  searchQuery: string = ''; // Terme de recherche
  selectedItem: any = null; // Offre sélectionnée pour afficher la description complète

  constructor(public jobOfferService: JobOfferService) { }

  ngOnInit(): void {
    this.fetchPublishedJobOffers();
  }

  // Récupère les offres d'emploi publiées
  fetchPublishedJobOffers() {
    this.jobOfferService.getJobOffers().subscribe({
      next: (data) => {
        this.blogList = data.filter(offer => offer.publish); // Filtre les offres publiées
        this.updateDisplayedBlogs(); // Met à jour les offres affichées
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des offres publiées :', error);
      }
    });
  }

  // Met à jour la liste des offres affichées en fonction de la page actuelle
  updateDisplayedBlogs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedBlogs = this.blogList.slice(startIndex, endIndex);
  }

  // Change de page
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return; // Empêche de dépasser les limites
    this.currentPage = page;
    this.updateDisplayedBlogs();
  }

  // Calcule le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.blogList.length / this.itemsPerPage);
  }

  // Génère un tableau de numéros de page pour la pagination
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Filtre les offres par date
  filterByDate(range: string): void {
    const today = new Date(); // Date actuelle
    today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour éviter les problèmes de comparaison

    // Crée une copie de la liste complète des offres
    let filteredList = this.blogList.slice();

    switch (range) {
        case 'today':
            // Filtre pour les offres publiées aujourd'hui
            filteredList = filteredList.filter(offer => {
                const offerDate = new Date(offer.postedDate);
                offerDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure
                return offerDate.getTime() === today.getTime();
            });
            break;

        case 'thisWeek':
            // Filtre pour les offres publiées cette semaine
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Début de la semaine (dimanche)
            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Fin de la semaine (samedi)

            filteredList = filteredList.filter(offer => {
                const offerDate = new Date(offer.postedDate);
                return offerDate >= startOfWeek && offerDate <= endOfWeek;
            });
            break;

        case 'thisMonth':
            // Filtre pour les offres publiées ce mois-ci
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Début du mois
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Fin du mois

            filteredList = filteredList.filter(offer => {
                const offerDate = new Date(offer.postedDate);
                return offerDate >= startOfMonth && offerDate <= endOfMonth;
            });
            break;

        case 'thisYear':
            // Filtre pour les offres publiées cette année
            const startOfYear = new Date(today.getFullYear(), 0, 1); // Début de l'année
            const endOfYear = new Date(today.getFullYear(), 11, 31); // Fin de l'année

            filteredList = filteredList.filter(offer => {
                const offerDate = new Date(offer.postedDate);
                return offerDate >= startOfYear && offerDate <= endOfYear;
            });
            break;

        default:
            // Aucun filtre appliqué
            break;
    }

    // Met à jour la liste affichée
    this.displayedBlogs = filteredList.slice(0, this.itemsPerPage);
    this.currentPage = 1; // Réinitialise la pagination
}

  // Filtre les offres par titre ou description
  applySearchFilter(): void {
    if (this.searchQuery) {
      this.blogList = this.blogList.filter(offer =>
        offer.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fetchPublishedJobOffers(); // Réinitialise la liste si la recherche est vide
    }
    this.currentPage = 1; // Réinitialise la pagination
    this.updateDisplayedBlogs();
  }

  // Affiche ou masque la description complète
  showFullDescription(item: any): void {
    if (this.selectedItem === item) {
      // Si l'élément est déjà sélectionné, on le désélectionne (pour "Read Less")
      this.selectedItem = null;
    } else {
      // Sinon, on sélectionne l'élément (pour "Read More")
      this.selectedItem = item;
    }
  }

  // Scroll vers le haut de la page
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
