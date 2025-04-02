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
      reportedById: 1,
      projectId: formData.projectId,
      reporterName: formData.reporterName
    };
    return this.http.post<IncidentReport>(this.apiUrl, incidentData);
  }

  getIncidents(): Observable<IncidentReport[]> {
    return this.http.get<IncidentReport[]>(this.apiUrl);
  }

  assignTechnician(incidentId: number, technicianId: number): Observable<void> {
    const url = `${this.apiUrl}/${incidentId}/assign-technician/${technicianId}`;
    return this.http.put<void>(url, {});
  }
}
