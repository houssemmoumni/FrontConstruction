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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent  } from '../confirmation-dialog/confirmation-dialog.component';

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
    MatDialogModule
  ],
})
export class JoboffreComponent implements OnInit {
  jobOffers: JobOffer[] = [];
  filteredJobOffers: JobOffer[] = [];
  paginatedJobOffers: JobOffer[] = [];
  searchText: string = '';
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(
    public jobOfferService: JobOfferService,
    public router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadJobOffers();
  }

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

  applyFilter(): void {
    this.filteredJobOffers = this.jobOffers.filter(offer => {
      const title = offer.title ? offer.title.toLowerCase() : '';
      const description = offer.description ? offer.description.toLowerCase() : '';
      return (
        title.includes(this.searchText.toLowerCase()) ||
        description.includes(this.searchText.toLowerCase())
      );
    });
    this.currentPage = 0;
    this.updatePaginatedOffers();
  }

  updatePaginatedOffers(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedJobOffers = this.filteredJobOffers.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedOffers();
  }

  editOffer(offer: JobOffer): void {
    this.router.navigate(['/addjob', offer.id]);
  }

  deleteOffer(offer: JobOffer): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette offre de travail ?',
        confirmText: 'Supprimer',
        cancelText: 'Annuler'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.jobOfferService.deleteJobOffer(offer.id).subscribe(
          () => {
            this.loadJobOffers();
          },
          (error) => {
            console.error('Erreur lors de la suppression :', error);
          }
        );
      }
    });
  }

  publishOffer(offer: JobOffer): void {
    if (offer.id) {
      this.jobOfferService.publishJobOffer(offer.id).subscribe({
        next: (updatedOffer: JobOffer) => {
          const index = this.jobOffers.findIndex(o => o.id === offer.id);
          if (index !== -1) {
            this.jobOffers[index] = updatedOffer;
            this.applyFilter();
          }
        },
        error: (error) => {
          console.error('Erreur lors de la publication :', error);
        },
      });
    }
  }

  navigate(): void {
    this.router.navigate(['/addjob']);
  }
}
