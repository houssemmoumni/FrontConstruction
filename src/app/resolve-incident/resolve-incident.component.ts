import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../services/incident.service';

@Component({
  selector: 'app-resolve-incident',
  standalone: true, // Required for standalone components
  imports: [
    CommonModule,
    MatCardModule, // Required for <mat-card>
    MatProgressSpinnerModule, // Required for <mat-spinner>
    MatButtonModule, // Required for <mat-button>
    MatSnackBarModule, // Required for MatSnackBar service
  ],
  templateUrl: './resolve-incident.component.html',
  styleUrls: ['./resolve-incident.component.scss'],
})
export class ResolveIncidentComponent implements OnInit {
  incidentId!: number;
  technicianId: number = 1;
  token: string | null = null;
  incidentDetails: any = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.incidentId = +params.get('id')!;
      this.token = this.route.snapshot.queryParamMap.get('token');

      if (!this.incidentId) {
        this.showError('Invalid incident ID');
        this.router.navigate(['/incidents']);
        return;
      }

      this.loadIncidentDetails();
    });
  }

  loadIncidentDetails(): void {
    this.loading = true;
    this.incidentService.getIncidentById(this.incidentId).subscribe({
      next: (incident) => {
        this.incidentDetails = incident;
        this.loading = false;
      },
      error: () => {
        this.showError('Failed to load incident details');
        this.loading = false;
      }
    });
  }

  resolve(resolved: boolean): void {
    if (!this.incidentId) {
      this.showError('No incident selected');
      return;
    }

    this.loading = true;
    this.incidentService.resolveIncident(this.incidentId, resolved, this.technicianId).subscribe({
      next: () => {
        this.showSuccess(`Incident marked as ${resolved ? 'resolved' : 'unresolved'}`);

        this.loadIncidentDetails();
      },
      error: () => {
        this.showError('Failed to update incident status');
        this.loading = false;
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
