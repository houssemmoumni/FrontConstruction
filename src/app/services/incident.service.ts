import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IncidentReport, AssignIncidentRequest, User } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private apiUrl = 'http://localhost:8065/api/incidents';

  constructor(private http: HttpClient) {}

  assignIncident(incidentId: number, request: AssignIncidentRequest): Observable<IncidentReport> {
    return this.http.post<IncidentReport>(`${this.apiUrl}/${incidentId}/assign`, request).pipe(
      catchError(error => {
        let errorMsg = 'Failed to assign incident';
        if (error.error?.error) errorMsg += ': ' + error.error.error;
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  getTechnicians(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/technicians`).pipe(
      catchError(error => throwError(() => new Error('Failed to load technicians')))
    );
  }

  createIncident(incidentData: any): Observable<IncidentReport> {
    return this.http.post<IncidentReport>(this.apiUrl, incidentData).pipe(
      catchError(error => throwError(() => new Error('Error creating incident')))
    );
  }

  getAllIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(this.apiUrl).pipe(
      catchError(error => throwError(() => new Error('Error fetching incidents')))
    );
  }

  getIncidentById(id: number): Observable<IncidentReport> {
    return this.http.get<IncidentReport>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => throwError(() => new Error('Error fetching incident')))
    );
  }

  resolveIncident(id: number, resolved: boolean, technicianId: number): Observable<IncidentReport> {
    return this.http.patch<IncidentReport>(
      `${this.apiUrl}/${id}/resolve`,
      {},
      { params: { resolved: resolved.toString(), technicianId: technicianId.toString() } }
    ).pipe(
      catchError(error => throwError(() => new Error('Error resolving incident')))
    );
  }

  getResolvedIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(`${this.apiUrl}/resolved`).pipe(
      catchError(error => throwError(() => new Error('Error fetching resolved incidents')))
    );
  }

  getUnresolvedIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(`${this.apiUrl}/unresolved`).pipe(
      catchError(error => throwError(() => new Error('Error fetching unresolved incidents')))
    );
  }

  generateResolveLink(incidentId: number): Observable<{link: string}> {
    return this.http.get<{link: string}>(`${this.apiUrl}/${incidentId}/resolve-link`).pipe(
      catchError(error => throwError(() => new Error('Failed to generate resolve link')))
    );
  }

  getIncidentByToken(token: string): Observable<IncidentReport> {
    return this.http.get<IncidentReport>(`${this.apiUrl}/by-token/${token}`).pipe(
      catchError(error => throwError(() => new Error('Invalid or expired token')))
    );
  }

  resolveWithToken(id: number, resolved: boolean, token: string): Observable<IncidentReport> {
    return this.http.patch<IncidentReport>(
      `${this.apiUrl}/${id}/resolve-with-token`,
      {},
      { params: { resolved: resolved.toString(), token } }
    ).pipe(
      catchError(error => throwError(() => new Error('Error resolving incident with token')))
    );
  }
}
