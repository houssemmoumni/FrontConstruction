import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationDTO } from '../models/application.dto';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:8060/api/applications';
  private contractUrl = 'http://localhost:8060/api/contracts';

  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching applications:', error);
        return throwError(() => new Error('Error fetching applications.'));
      })
    );
  }

  updateApplicationStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating application status:', error);
        return throwError(() => new Error('Error updating application status.'));
      })
    );
  }

  downloadContractPdf(applicationId: number): Observable<Blob> {
    return this.http.get(`${this.contractUrl}/generate/${applicationId}`, {
      responseType: 'blob',
      withCredentials: true
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error downloading contract:', error);
        let errorMessage = 'Failed to download contract';

        if (error.status === 403) {
          errorMessage = 'Access denied - please login again';
        } else if (error.status === 404) {
          errorMessage = 'Application not found';
        } else if (error.status === 400) {
          errorMessage = 'Candidate has not passed the interview yet';
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getContractByCandidate(candidateId: number): Observable<any> {
    return this.http.get(`${this.contractUrl}/candidate/${candidateId}`, {
      withCredentials: true
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching contract:', error);
        return throwError(() => new Error('Error fetching contract.'));
      })
    );
  }
}
