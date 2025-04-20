import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IncidentService } from '../services/incident.service';
import { IncidentReport } from '../models/incident.model';

@Component({
  selector: 'app-resolve-incident',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './resolve-incident.component.html',
  styleUrls: ['./resolve-incident.component.scss']
})
export class ResolveIncidentComponent {
  incidentId!: number;
  token: string | null = null;
  incidentDetails: IncidentReport | null = null;
  loading = false;
  validToken = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.incidentId = +params.get('id')!;
      this.token = this.route.snapshot.queryParamMap.get('token');
      this.loadIncident();
    });
  }

  loadIncident(): void {
    this.loading = true;
    this.errorMessage = null;

    const load$ = this.token
      ? this.incidentService.getIncidentByToken(this.token)
      : this.incidentService.getIncidentById(this.incidentId);

    load$.subscribe({
      next: (incident) => {
        if (this.token && incident.id !== this.incidentId) {
          this.showError('Token does not match incident');
          return;
        }
        this.incidentDetails = incident;
        this.validToken = !!this.token;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = this.token
          ? 'Invalid or expired token'
          : 'Failed to load incident details';
        this.showError(this.errorMessage);
      }
    });
  }

  resolve(resolved: boolean): void {
    if (!this.incidentDetails) return;

    this.loading = true;
    const resolve$ = this.token
      ? this.incidentService.resolveWithToken(this.incidentId, resolved, this.token)
      : this.incidentService.resolveIncident(this.incidentId, resolved, 1); // Default technician ID

    resolve$.subscribe({
      next: (updatedIncident) => {
        this.incidentDetails = updatedIncident;
        this.showSuccess(`Incident ${resolved ? 'resolved' : 'reopened'} successfully`);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.showError('Failed to update incident status: ' + err.message);
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