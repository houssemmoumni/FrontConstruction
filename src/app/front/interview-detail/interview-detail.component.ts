import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from '../../services/interview.service';
import { Interview } from '../../models/interview.model';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.scss']
})
export class InterviewDetailComponent implements OnInit {
  interview?: Interview;
  formattedDate = '';
  isLoading = true;
  error: string | null = null;
  canJoin = false;
  showSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interviewService: InterviewService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      const applicationId = params.get('applicationId');

      if (token) {
        this.loadInterviewByToken(token);
      } else if (applicationId) {
        this.loadInterviewByApplicationId(applicationId);
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  private loadInterviewByToken(token: string): void {
    this.interviewService.getInterviewByToken(token).subscribe({
      next: (interview) => {
        if (interview) {
          this.interview = interview;
          this.updateInterviewData();
          this.activateLinkIfNeeded(token);
        } else {
          this.error = 'Invalid or expired interview link';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load interview details';
        this.isLoading = false;
      }
    });
  }

  private loadInterviewByApplicationId(applicationId: string): void {
    this.interviewService.getInterviewByApplicationId(+applicationId).subscribe({
      next: (interviews) => {
        if (interviews?.[0]) {
          this.interview = interviews[0];
          this.updateInterviewData();
        } else {
          this.error = 'No interview scheduled for this application';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load interview details';
        this.isLoading = false;
      }
    });
  }

  private updateInterviewData(): void {
    if (!this.interview) return;
    this.formattedDate = this.interviewService.formatInterviewDate(
      this.interview.interviewDate,
      this.interview.interviewTime
    );
    this.canJoin = this.interviewService.canJoinInterview(
      this.interview.interviewDate,
      this.interview.interviewTime
    );
  }

  private activateLinkIfNeeded(token: string): void {
    if (this.canJoin && this.interview?.token) {
      this.interviewService.activateInterviewLink(token).subscribe({
        error: (err) => console.error('Failed to activate link:', err)
      });
    }
  }

  completeInterview(): void {
    if (!this.interview?.id) return;

    this.interviewService.completeInterview(this.interview.id).subscribe({
      next: () => {
        this.showSuccess = true;
        setTimeout(() => this.router.navigate(['/interviews/completed']), 2000);
      },
      error: (err) => {
        this.error = `Error: ${err.message || 'Unknown error'}`;
      }
    });
  }

  addToCalendar(): void {
    if (!this.interview?.interviewDate || !this.interview.interviewTime) return;

    const startDate = new Date(
      `${this.interview.interviewDate}T${this.interview.interviewTime}`
    );
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE` +
      `&text=Interview for Application ${this.interview.applicationId}` +
      `&dates=${startDate.toISOString().replace(/[-:.]/g, '')}` +
      `/${endDate.toISOString().replace(/[-:.]/g, '')}` +
      `&details=Interview meeting. Link: ${encodeURIComponent(this.interview.meetLink ?? '')}` +
      `&location=${encodeURIComponent(this.interview.meetLink ?? '')}`;

    window.open(calendarUrl, '_blank');
  }
}
