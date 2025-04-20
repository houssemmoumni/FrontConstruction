import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { ApplicationDTO } from '../models/application.dto';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent  } from '../confirmation-dialog/confirmation-dialog.component';


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
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule
  ],

  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {
  applications: ApplicationDTO[] = [];
  filteredApplications: ApplicationDTO[] = [];
  paginatedApplications: ApplicationDTO[] = [];
  searchText: string = '';
  selectedStatus: string = 'ALL';
  pageSize: number = 5;
  currentPage: number = 0;
  highlightedId: number | null = null;

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadApplications();
    this.route.queryParams.subscribe(params => {
      if (params['applicationId']) {
        this.highlightApplication(params['applicationId']);
      }
    });
  }

  loadApplications(): void {
    this.candidateService.getAllApplications().subscribe({
      next: (data: ApplicationDTO[]) => {
        this.applications = data.map(app => ({
          ...app,
          interviewPassed: this.checkInterviewPassed(app)
        }));
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error loading applications:', err);
      },
    });
  }

  private checkInterviewPassed(application: ApplicationDTO): boolean {
    return application.status === 'ACCEPTED' && (application as any).interviewPassed === true;
  }

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

    this.currentPage = 0;
    this.updatePaginatedApplications();
  }

  updatePaginatedApplications(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedApplications = this.filteredApplications.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedApplications();
  }

  updateStatus(id: number, status: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
            title: status === 'ACCEPTED' ? 'Confirmer l\'acceptation' : 'Confirmer le rejet',
            message: `Êtes-vous sûr de vouloir ${status === 'ACCEPTED' ? 'accepter' : 'rejeter'} cette candidature ?`,
            confirmText: 'Confirmer',
            cancelText: 'Annuler'
        }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
            this.candidateService.updateApplicationStatus(id, status).subscribe({
                next: () => {
                    this.showSuccessModal(status);
                    this.loadApplications();
                },
                error: (err) => {
                    this.showErrorModal(err);
                }
            });
        }
    });
}

private showSuccessModal(status: string): void {
    this.dialog.open(ConfirmDialogComponent, {
        data: {
            title: 'Succès',
            message: `La candidature a été ${status === 'ACCEPTED' ? 'acceptée' : 'rejetée'} avec succès`,
            confirmText: 'OK',
            hideCancel: true
        }
    });
}

private showErrorModal(error: any): void {
    this.dialog.open(ConfirmDialogComponent, {
        data: {
            title: 'Erreur',
            message: 'Une erreur est survenue lors de la mise à jour du statut',
            confirmText: 'OK',
            hideCancel: true
        }
    });
}
  downloadResume(resume: string, candidateName: string): void {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${resume}`;
    link.download = `CV_${candidateName}.pdf`;
    link.click();
  }

  generateContract(applicationId: number): void {
    this.candidateService.downloadContractPdf(applicationId).subscribe({
      next: (pdf: Blob) => {
        const blobUrl = URL.createObjectURL(pdf);
        window.open(blobUrl, '_blank');
      },
      error: (err) => {
        console.error('Error generating contract:', err);
      }
    });
  }

  nommer(applicationId: number): void {
    this.candidateService.downloadContractPdf(applicationId).subscribe({
      next: () => {
        this.loadApplications();
      },
      error: (err) => {
        console.error('Error during nomination:', err);
      }
    });
  }

  highlightApplication(applicationId: string): void {
    this.highlightedId = Number(applicationId);
    setTimeout(() => {
      this.highlightedId = null;
    }, 3000);
  }
}