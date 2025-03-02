import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importez CommonModule
import { CandidateService } from '../services/candidate.service'; // Importez le service
import { ApplicationDTO } from '../models/application.dto'; // Importez le modèle

@Component({
  selector: 'app-application-list',
  standalone: true, // Assurez-vous que le composant est standalone
  imports: [CommonModule], // Importez CommonModule ici
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
})
export class ApplicationListComponent implements OnInit {
  applications: ApplicationDTO[] = []; // Tableau pour stocker les candidatures

  constructor(private candidateService: CandidateService) {} // Injectez le service

  ngOnInit(): void {
    this.loadApplications(); // Chargez les candidatures au démarrage du composant
  }

  // Méthode pour charger les candidatures
  loadApplications(): void {
    this.candidateService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = data; // Assignez les données récupérées au tableau
        console.log('Applications chargées :', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des candidatures :', err);
        alert('Erreur lors du chargement des candidatures. Veuillez réessayer.');
      },
    });
  }

  // Méthode pour mettre à jour le statut d'une candidature
  updateStatus(id: number, status: string): void {
    this.candidateService.updateApplicationStatus(id, status).subscribe({
      next: () => {
        alert('Statut mis à jour avec succès !');
        this.loadApplications(); // Rechargez les candidatures après la mise à jour
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut :', err);
        alert('Erreur lors de la mise à jour du statut. Veuillez réessayer.');
      },
    });
  }
}
