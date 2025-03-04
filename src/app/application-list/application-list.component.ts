import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../services/candidate.service';
import { ApplicationDTO } from '../models/application.dto';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
})
export class ApplicationListComponent implements OnInit {
  applications: ApplicationDTO[] = [];

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.candidateService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = data;
        console.log('Applications chargées :', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des candidatures :', err);
        alert('❌ Erreur lors du chargement des candidatures. Veuillez réessayer.');
      },
    });
  }

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

  downloadResume(resume: string, candidateName: string): void {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${resume}`;
    link.download = `CV_${candidateName}.pdf`;
    link.click();
  }
}
