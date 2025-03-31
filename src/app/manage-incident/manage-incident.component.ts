// src/app/admin/manage-incidents/manage-incidents.component.ts
import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../services/incident.service';
import { IncidentReport } from '../models/incident.model';

@Component({
  selector: 'app-manage-incidents',
  templateUrl: './manage-incidents.component.html',
  styleUrls: ['./manage-incidents.component.scss']
})
export class ManageIncidentsComponent implements OnInit {
  incidents: IncidentReport[] = [];
  technicians = [
    { id: 2, name: 'Jean Dupont' },
    { id: 3, name: 'Marie Martin' },
    { id: 4, name: 'Pierre Durand' }
  ];

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.incidentService.getIncidents().subscribe({
      next: (incidents) => this.incidents = incidents,
      error: (err) => console.error('Erreur:', err)
    });
  }

  assignTechnician(incidentId: number, technicianId: string): void {
    if (!technicianId) return;

    this.incidentService.assignTechnician(incidentId, +technicianId).subscribe({
      next: () => this.loadIncidents(),
      error: (err) => console.error('Erreur:', err)
    });
  }
}
