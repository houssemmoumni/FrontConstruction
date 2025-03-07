import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobOfferService } from '../services/job-offer.service';
import { JobOffer } from '../models/job-offer.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-joboffre',
  templateUrl: './joboffre.component.html',
  styleUrls: ['./joboffre.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class JoboffreComponent implements OnInit {
  jobOffers: JobOffer[] = []; // Liste complète des offres
  filteredJobOffers: JobOffer[] = []; // Liste filtrée des offres
  paginatedJobOffers: JobOffer[] = []; // Offres à afficher sur la page actuelle
  searchText: string = ''; // Texte de recherche
  pageSize: number = 5; // Nombre d'offres par page
  currentPage: number = 0; // Page actuelle

  constructor(public jobOfferService: JobOfferService, public router: Router) {}

  ngOnInit(): void {
    this.loadJobOffers();
  }

  // Charger les offres d'emploi
  loadJobOffers(): void {
    this.jobOfferService.getJobOffers().subscribe(
      (data: JobOffer[]) => {
        this.jobOffers = data;
        this.filteredJobOffers = data;
        this.updatePaginatedOffers();
      },
      (error) => {
        console.error('Erreur lors du chargement des offres :', error);
      }
    );
  }

  // Appliquer le filtre de recherche
  applyFilter(): void {
    this.filteredJobOffers = this.jobOffers.filter(offer => {
      const title = offer.title ? offer.title.toLowerCase() : '';
      const description = offer.description ? offer.description.toLowerCase() : '';
      return (
        title.includes(this.searchText.toLowerCase()) ||
        description.includes(this.searchText.toLowerCase())
      );
    });
    this.currentPage = 0; // Réinitialiser la pagination après une recherche
    this.updatePaginatedOffers();
  }

  // Mettre à jour les offres paginées
  updatePaginatedOffers(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedJobOffers = this.filteredJobOffers.slice(startIndex, endIndex);
  }

  // Gérer le changement de page
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedOffers();
  }

  // Modifier une offre
  editOffer(offer: JobOffer): void {
    console.log('Modifier l\'offre :', offer);
    this.router.navigate(['/addjob', offer.id]);
  }

  // Supprimer une offre
  deleteOffer(offer: JobOffer): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      this.jobOfferService.deleteJobOffer(offer.id).subscribe(
        () => {
          this.loadJobOffers();
        },
        (error) => {
          console.error('Erreur lors de la suppression :', error);
        }
      );
    }
  }

  // Publier une offre
  publishOffer(offer: JobOffer): void {
    if (offer.id) {
      this.jobOfferService.publishJobOffer(offer.id).subscribe({
        next: (updatedOffer: JobOffer) => {
          console.log('Offre publiée :', updatedOffer);
          // Mettre à jour l'offre localement
          const index = this.jobOffers.findIndex(o => o.id === offer.id);
          if (index !== -1) {
            this.jobOffers[index] = updatedOffer;
            this.applyFilter(); // Rafraîchir la liste filtrée
          }
        },
        error: (error) => {
          console.error('Erreur lors de la publication :', error);
        },
      });
    } else {
      console.error('Erreur : L\'offre n\'a pas d\'ID.');
    }
  }

  // Redirection vers l'ajout d'une offre
  navigate(): void {
    this.router.navigate(['/addjob']);
  }
}
