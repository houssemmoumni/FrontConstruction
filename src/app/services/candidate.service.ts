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

  // Submit an application
  submitApplication(
    candidateId: number,
    jobOfferId: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    resumeFile: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('candidateId', candidateId.toString());
    formData.append('jobOfferId', jobOfferId.toString());
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('resumeFile', resumeFile);

    return this.http.post(this.apiUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la soumission de la candidature :', error);
        return throwError(() => new Error('Erreur lors de la soumission de la candidature.'));
      })
    );
  }

  // Fetch all applications
  getAllApplications(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération des candidatures :', error);
        return throwError(() => new Error('Erreur lors de la récupération des candidatures.'));
      })
    );
  }

  // Update the status of an application
  updateApplicationStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la mise à jour du statut :', error);
        return throwError(() => new Error('Erreur lors de la mise à jour du statut.'));
      })
    );
  }
}
