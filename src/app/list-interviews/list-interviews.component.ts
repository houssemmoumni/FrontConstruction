import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview.service';
import { CompletedInterview } from '../models/interview.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CandidateService } from '../services/candidate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-interviews',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule],
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
    private snackBar: MatSnackBar
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
        this.error = 'Erreur lors du chargement des entretiens.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
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

        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
          this.generatingContractId = null;
        }, 100);
      },
      error: (err) => {
        console.error('Error generating contract:', err);
        this.snackBar.open(err.message, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.generatingContractId = null;
      }
    });
  }
}
