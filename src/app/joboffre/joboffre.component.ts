import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobOfferService } from '../services/job-offer.service';
import { JobOffer } from '../models/job-offer.model';
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
    NgClass,
    NgFor,
    NgIf,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
  ],
})
export class JoboffreComponent implements OnInit {
  jobOffers: JobOffer[] = []; // Liste des offres d'emploi

  constructor(public jobOfferService: JobOfferService, public router: Router) {}

  ngOnInit(): void {
    this.loadJobOffers();
  }

  // Charger les offres d'emploi publiées
  loadJobOffers(): void {
    this.jobOfferService.getJobOffers().subscribe(
      (data: JobOffer[]) => {
        this.jobOffers = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des offres :', error);
      }
    );
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
      // Vérifie que l'ID n'est pas undefined
      console.log('ID de l\'offre à publier :', offer.id);
      this.jobOfferService.publishJobOffer(offer.id).subscribe({
        next: (updatedOffer: JobOffer) => {
          console.log('Offre publiée :', updatedOffer);
          // Mettre à jour tous les champs de l'offre localement
          offer.publish = updatedOffer.publish;
          offer.title = updatedOffer.title;
          offer.postedDate = updatedOffer.postedDate;
          offer.Status = updatedOffer.Status;
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
  navigate() {
    this.router.navigate(['/addjob']);
  }
}
