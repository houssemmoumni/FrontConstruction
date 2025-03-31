// src/app/services/incident.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentReport, IncidentForm } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private apiUrl = 'http://localhost:8065/api/incidents';

  constructor(private http: HttpClient) {}

  createIncident(formData: IncidentForm): Observable<IncidentReport> {
    const incidentData = {
      description: formData.description,
      reportDate: new Date().toISOString(),
      status: 'DECLARED',
      severity: formData.severity,
      reportedById: 1, // Temporary - should be actual user ID
      projectId: formData.projectId
    };
    return this.http.post<IncidentReport>(this.apiUrl, incidentData);
  }

  getIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(this.apiUrl);
  }

  assignTechnician(incidentId: number, technicianId: number): Observable<IncidentReport> {
    return this.http.patch<IncidentReport>(`${this.apiUrl}/${incidentId}`, {
      assignedToId: technicianId,
      status: 'ASSIGNED'
    });
  }
}
