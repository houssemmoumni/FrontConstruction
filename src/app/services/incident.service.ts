import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IncidentReport, AssignIncidentRequest, User } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private apiUrl = 'http://localhost:8065/api/incidents'; // Base URL for the incidents API

  constructor(private http: HttpClient) {}

  // Create a new incident
  createIncident(incidentData: any): Observable<IncidentReport> {
    return this.http.post<IncidentReport>(this.apiUrl, incidentData).pipe(
      catchError(error => {
        console.error('Error creating incident:', error);
        return throwError(() => new Error('Error creating incident'));
      })
    );
  }

  // Get all incidents
  getAllIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching incidents:', error);
        return throwError(() => new Error('Error fetching incidents'));
      })
    );
  }

  // Assign an incident to a technician
  assignIncident(incidentId: number, request: AssignIncidentRequest): Observable<IncidentReport> {
    return this.http.post<IncidentReport>(`${this.apiUrl}/${incidentId}/assign`, request).pipe(
      catchError(error => {
        console.error('Error assigning incident:', error);
        return throwError(() => new Error('Error assigning incident'));
      })
    );
  }

  // Get all technicians
  getTechnicians(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/technicians`).pipe(
      catchError(error => {
        console.error('Error fetching technicians:', error);
        return throwError(() => new Error('Error fetching technicians'));
      })
    );
  }

  // Get a specific incident by ID
  getIncidentById(id: number): Observable<IncidentReport> {
    return this.http.get<IncidentReport>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching incident:', error);
        return throwError(() => new Error('Error fetching incident'));
      })
    );
  }
}
