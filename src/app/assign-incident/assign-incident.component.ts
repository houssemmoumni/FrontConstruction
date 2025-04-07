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
    this.incident = data.incident;
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
      adminId: 1, // Replace with actual admin ID from your system
      comments: this.comments
    };

    this.incidentService.assignIncident(this.incident.id, request).subscribe({
      next: (response: any) => {
        let message = 'Incident assigned successfully';

        if (response.emailSent !== undefined) {
          message += response.emailSent
            ? ' - Email notification sent'
            : ' - Email failed: ' + (response.emailError || 'Unknown error');
        }

        this.snackBar.open(message, 'Close', {
          duration: 5000,
          panelClass: response.success ? ['success-snackbar'] : ['error-snackbar']
        });

        if (response.success) {
          this.dialogRef.close(response.incident);
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        this.snackBar.open('Assignment failed: ' + err.message, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
