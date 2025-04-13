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
  providers: [CandidateService],
})
export class ApplicationListComponent implements OnInit {
  applications: ApplicationDTO[] = [];
  filteredApplications: ApplicationDTO[] = [];
  paginatedApplications: ApplicationDTO[] = [];
  searchText: string = '';
  selectedStatus: string = 'ALL';
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute
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
      error: (err: any) => {
        console.error('Error loading applications:', err);
        alert('❌ Error loading applications. Please try again.');
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
    this.candidateService.updateApplicationStatus(id, status).subscribe({
      next: () => {
        alert('✅ Status updated successfully!');
        this.loadApplications();
      },
      error: (err: any) => {
        console.error('Error updating status:', err);
        alert('❌ Error updating status. Please try again.');
      },
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
      error: (err: any) => {
        console.error('Error generating contract:', err);
        alert('❌ Error generating contract: ' + (err.error?.message || err.message));
      }
    });
  }

  nommer(applicationId: number): void {
    this.candidateService.downloadContractPdf(applicationId).subscribe({
      next: () => {
        alert('✅ Candidate nominated successfully.');
        this.loadApplications();
      },
      error: (err: any) => {
        console.error('Error during nomination:', err);
        alert('❌ Error during candidate nomination. Please try again.');
      }
    });
  }

  highlightApplication(applicationId: string): void {
    const id = Number(applicationId);
    setTimeout(() => {
      const element = document.getElementById(`app-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add('highlight');
        setTimeout(() => element.classList.remove('highlight'), 3000);
      }
    }, 500);
  }
}
