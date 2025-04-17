// src/app/incident-list/incident-list.component.ts
import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IncidentService } from '../services/incident.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AssignIncidentComponent } from '../assign-incident/assign-incident.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgFor,
    NgIf
  ]
})
export class IncidentListComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns = ['id', 'description', 'status', 'assignedTo', 'actions', 'history'];

  constructor(private incidentService: IncidentService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidentService.getAllIncidents().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openAssignDialog(incident: any) {
    const dialogRef = this.dialog.open(AssignIncidentComponent, {
      data: { incident },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIncidents();
      }
    });
  }

  getHistoryIcon(action: string): string {
    switch(action.toLowerCase()) {
      case 'resolved': return 'check_circle';
      case 'reopened': return 'autorenew';
      case 'assigned': return 'assignment_ind';
      default: return 'history';
    }
  }
}
