import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../services/candidate.service';
import { ApplicationDTO } from '../models/application.dto';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
})
export class ApplicationListComponent implements OnInit {
  applications: ApplicationDTO[] = []; // Liste complète des candidatures
  filteredApplications: ApplicationDTO[] = []; // Liste filtrée des candidatures
  paginatedApplications: ApplicationDTO[] = []; // Candidatures à afficher sur la page actuelle
  searchText: string = ''; // Texte de recherche
  selectedStatus: string = 'ALL'; // Statut sélectionné (ACCEPTED, REJECTED, ALL)
  pageSize: number = 5; // Nombre d'éléments par page
  currentPage: number = 0; // Page actuelle

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  // Charger les candidatures
  loadApplications(): void {
    this.candidateService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = data;
        this.applyFilter(); // Appliquer le filtre initial
      },
      error: (err) => {
        console.error('Erreur lors du chargement des candidatures :', err);
        alert('❌ Erreur lors du chargement des candidatures. Veuillez réessayer.');
      },
    });
  }

  // Appliquer le filtre de recherche et de statut
  applyFilter(): void {
    this.filteredApplications = this.applications.filter((application) => {
      const matchesSearch =
        application.candidate.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        application.candidate.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        application.candidate.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
        application.jobOffer.title.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === 'ALL' || application.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    this.currentPage = 0; // Réinitialiser la pagination après un filtre
    this.updatePaginatedApplications();
  }

  // Mettre à jour les candidatures paginées
  updatePaginatedApplications(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedApplications = this.filteredApplications.slice(startIndex, endIndex);
  }

  // Gérer le changement de page
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedApplications();
  }

  // Mettre à jour le statut d'une candidature
  updateStatus(id: number, status: string): void {
    this.candidateService.updateApplicationStatus(id, status).subscribe({
      next: () => {
        alert('✅ Statut mis à jour avec succès !');
        this.loadApplications(); // Recharger la liste des candidatures après la mise à jour
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut :', err);
        alert('❌ Erreur lors de la mise à jour du statut. Veuillez réessayer.');
      },
    });
  }

  // Télécharger le CV
  downloadResume(resume: string, candidateName: string): void {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${resume}`;
    link.download = `CV_${candidateName}.pdf`;
    link.click();
  }
}
