import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApplicationDTO } from '../models/application.dto';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = 'http://localhost:8060/api/applications';

  constructor(private http: HttpClient) {}

  // Fetch all applications
  getAllApplications(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching applications:', error);
        return throwError(() => new Error('Error fetching applications.'));
      })
    );
  }

  // Update application status
  updateApplicationStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating application status:', error);
        return throwError(() => new Error('Error updating application status.'));
      })
    );
  }
}
