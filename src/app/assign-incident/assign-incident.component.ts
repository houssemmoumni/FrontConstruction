import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IncidentService } from '../services/incident.service';
import { AssignIncidentRequest, IncidentReport, User } from '../models/incident.model';

@Component({
  selector: 'app-assign-incident',
  templateUrl: './assign-incident.component.html',
  styleUrls: ['./assign-incident.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class AssignIncidentComponent implements OnInit {
  technicianId: number | null = null;
  comments: string = '';
  technicians: User[] = [];
  loading: boolean = false;
  incident: IncidentReport;

  constructor(
    private dialogRef: MatDialogRef<AssignIncidentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { incident: IncidentReport },
    private incidentService: IncidentService,
    private snackBar: MatSnackBar
  ) {
    this.incident = data.incident || {} as IncidentReport;
  }

  ngOnInit(): void {
    this.loadTechnicians();
  }

  loadTechnicians(): void {
    this.loading = true;
    this.incidentService.getTechnicians().subscribe({
      next: (techs) => {
        this.technicians = techs;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load technicians', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  assign(): void {
    if (!this.technicianId) {
      this.snackBar.open('Please select a technician', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    const request: AssignIncidentRequest = {
      technicianId: this.technicianId,
      adminId: 1,
      comments: this.comments
    };

    this.incidentService.assignIncident(this.incident.id, request).subscribe({
      next: (result) => {
        this.snackBar.open('Incident assigned successfully', 'Close', { duration: 3000 });
        this.dialogRef.close(result);
      },
      error: () => {
        this.snackBar.open('Failed to assign incident', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
