import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { IncidentService } from '../../services/incident.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../../models/project.model';
import { IncidentForm } from '../../models/incident.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-declare-incident',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './declare-incident.component.html',
  styleUrls: ['./declare-incident.component.scss']
})
export class DeclareIncidentComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  incident: IncidentForm = {
    description: '',
    severity: 'MEDIUM',
    projectId: 0,
    reporterName: '',
    projectName: ''
  };
  isSubmitting = false;
  isLoading = false;

  constructor(
    private projectService: ProjectService,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPublishedProjects();
  }

  loadPublishedProjects(): void {
    this.isLoading = true;
    this.projectService.getPublishedProjects().subscribe({
      next: (projects) => {
        this.projects = projects.map(p => ({
          ...p,
          image: p.image ? 'data:image/jpeg;base64,' + p.image : undefined
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.showError('Failed to load projects: ' + this.getErrorMessage(err));
        this.isLoading = false;
      }
    });
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    this.incident.projectId = project.id || 0;
    this.incident.projectName = project.name;
  }

  cancel(): void {
    this.selectedProject = null;
    this.resetIncidentForm();
  }

  submitIncident(): void {
    if (!this.validateForm()) return;

    this.isSubmitting = true;
    this.incidentService.createIncident(this.incident).subscribe({
      next: () => {
        this.showSuccess('Incident reported successfully!');
        this.resetForm();
      },
      error: (err) => {
        this.showError('Failed to submit incident: ' + this.getErrorMessage(err));
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private validateForm(): boolean {
    if (!this.incident.reporterName?.trim()) {
      this.showError('Please enter your name');
      return false;
    }
    if (!this.incident.description?.trim()) {
      this.showError('Please describe the incident');
      return false;
    }
    if (!this.incident.projectId) {
      this.showError('Please select a project');
      return false;
    }
    return true;
  }

  private resetForm(): void {
    this.selectedProject = null;
    this.resetIncidentForm();
  }

  private resetIncidentForm(): void {
    this.incident = {
      description: '',
      severity: 'MEDIUM',
      projectId: 0,
      reporterName: '',
      projectName: ''
    };
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private getErrorMessage(error: any): string {
    if (error.error?.error) return error.error.error;
    if (error.message) return error.message;
    return 'Unknown error occurred';
  }
}
