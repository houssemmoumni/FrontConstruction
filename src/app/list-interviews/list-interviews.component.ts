import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview.service';
import { CompletedInterview } from '../models/interview.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CandidateService } from '../services/candidate.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent  } from '../confirmation-dialog/confirmation-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-list-interviews',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMiniFabButton
  ],
  templateUrl: './list-interviews.component.html',
  styleUrls: ['./list-interviews.component.scss']
})
export class ListInterviewsComponent implements OnInit {
  interviews: CompletedInterview[] = [];
  isLoading = true;
  error: string | null = null;
  generatingContractId: number | null = null;

  constructor(
    private interviewService: InterviewService,
    private candidateService: CandidateService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompletedInterviews();
  }

  loadCompletedInterviews(): void {
    this.interviewService.getCompletedInterviews().subscribe({
      next: (data) => {
        this.interviews = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.showErrorModal('Erreur lors du chargement des entretiens');
        this.isLoading = false;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  viewCandidate(candidateId: number): void {
    this.router.navigate(['/candidatelist'], { 
      queryParams: { 
        highlight: candidateId,
        from: 'interviews'
      } 
    });
  }

  confirmGenerateContract(applicationId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Générer le contrat',
        message: 'Êtes-vous sûr de vouloir générer le contrat pour cette candidature ?',
        confirmText: 'Générer',
        cancelText: 'Annuler'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.generateContract(applicationId);
      }
    });
  }

  generateContract(applicationId: number): void {
    this.generatingContractId = applicationId;

    this.candidateService.downloadContractPdf(applicationId).subscribe({
      next: (pdfBlob: Blob) => {
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `contract_${applicationId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
        this.generatingContractId = null;
        this.showSuccessModal('Contrat généré avec succès');
      },
      error: (err) => {
        this.generatingContractId = null;
        this.showErrorModal('Erreur lors de la génération du contrat');
      }
    });
  }

  private showSuccessModal(message: string): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Succès',
        message: message,
        confirmText: 'OK',
        hideCancel: true
      }
    });
  }

  private showErrorModal(message: string): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Erreur',
        message: message,
        confirmText: 'OK',
        hideCancel: true
      }
    });
  }
}