import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Interview, CompletedInterview } from '../models/interview.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiUrl = 'http://localhost:8060/api/interviews';

  constructor(private http: HttpClient) { }

  getInterviewByApplicationId(applicationId: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(`${this.apiUrl}/application/${applicationId}`).pipe(
      catchError(this.handleError)
    );
  }

  getInterviewByToken(token: string): Observable<Interview> {
    return this.http.get<Interview>(`${this.apiUrl}/by-token?token=${token}`).pipe(
      catchError(this.handleError)
    );
  }

  getCompletedInterviews(): Observable<CompletedInterview[]> {
    return this.http.get<CompletedInterview[]>(`${this.apiUrl}/completed`).pipe(
      catchError(this.handleError)
    );
  }

  completeInterview(interviewId: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${interviewId}/complete`, {}, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  activateInterviewLink(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/activate?token=${token}`).pipe(
      catchError(this.handleError)
    );
  }

  formatInterviewDate(date: string, time: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(`${date}T${time}`).toLocaleDateString('fr-FR', options);
  }

  canJoinInterview(interviewDate: string, interviewTime: string): boolean {
    const interviewDateTime = new Date(`${interviewDate}T${interviewTime}`);
    const now = new Date();
    const oneDayBefore = new Date(interviewDateTime.getTime() - (24 * 60 * 60 * 1000));
    return now >= oneDayBefore;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Unknown error occurred'));
  }
}
