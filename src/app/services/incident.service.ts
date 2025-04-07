import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IncidentReport, AssignIncidentRequest, User } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private apiUrl = 'http://localhost:8065/api/incidents';

  constructor(private http: HttpClient) {}

  assignIncident(incidentId: number, request: AssignIncidentRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${incidentId}/assign`, request).pipe(
      catchError(error => {
        let errorMsg = 'Failed to assign incident';
        if (error.error?.error) errorMsg += ': ' + error.error.error;
        else if (error.message) errorMsg += ': ' + error.message;
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  getTechnicians(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/technicians`).pipe(
      catchError(error => {
        return throwError(() => new Error('Failed to load technicians'));
      })
    );
  }

  createIncident(incidentData: any): Observable<IncidentReport> {
    return this.http.post<IncidentReport>(this.apiUrl, incidentData).pipe(
      catchError(error => {
        console.error('Error creating incident:', error);
        return throwError(() => new Error('Error creating incident'));
      })
    );
  }

  getAllIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching incidents:', error);
        return throwError(() => new Error('Error fetching incidents'));
      })
    );
  }

  getIncidentById(id: number): Observable<IncidentReport> {
    return this.http.get<IncidentReport>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching incident:', error);
        return throwError(() => new Error('Error fetching incident'));
      })
    );
  }

  resolveIncident(id: number, resolved: boolean, technicianId: number): Observable<IncidentReport> {
    return this.http.patch<IncidentReport>(`${this.apiUrl}/${id}/resolve`, null, {
      params: {
        resolved: resolved.toString(),
        technicianId: technicianId.toString()
      }
    }).pipe(
      catchError(error => {
        console.error('Error resolving incident:', error);
        return throwError(() => new Error('Error resolving incident'));
      })
    );
  }

  getResolvedIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(`${this.apiUrl}/resolved`).pipe(
      catchError(error => {
        console.error('Error fetching resolved incidents:', error);
        return throwError(() => new Error('Error fetching resolved incidents'));
      })
    );
  }

  getUnresolvedIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(`${this.apiUrl}/unresolved`).pipe(
      catchError(error => {
        console.error('Error fetching unresolved incidents:', error);
        return throwError(() => new Error('Error fetching unresolved incidents'));
      })
    );
  }

  generateResolveLink(incidentId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${incidentId}/resolve-link`, {
      responseType: 'text' as 'json'
    }).pipe(
      catchError(error => {
        console.error('Error generating resolve link', error);
        return throwError(() => new Error('Failed to generate resolve link'));
      })
    );
  }
}
