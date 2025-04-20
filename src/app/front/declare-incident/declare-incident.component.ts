import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
import { SeverityDetectionService } from '../../services/severity-detection.service';
import { animate, style, transition, trigger } from '@angular/animations';

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
  styleUrls: ['./declare-incident.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
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
  autoDetectedSeverity: string | null = null;
  isDetectingSeverity = false;
  predictedSeverity: string | null = null;
  confidence: number | null = null;
  userModifiedSeverity = false;

  constructor(
    private projectService: ProjectService,
    private incidentService: IncidentService,
    private severityDetection: SeverityDetectionService,
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
          image: p.image ? 'data:image/jpeg;base64,' + p.image : './assets/default-project.jpg'
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

  async onDescriptionChange(event: Event) {
    const description = (event.target as HTMLTextAreaElement).value;
    if (description.length > 10) {
      this.isDetectingSeverity = true;
      try {
        const result = await this.severityDetection.detectSeverity(description);
        this.autoDetectedSeverity = result.severity;
        this.predictedSeverity = result.severity;
        this.confidence = result.confidence;
        if (!this.userModifiedSeverity) {
          this.incident.severity = result.severity;
        }
      } catch (error) {
        console.error('Severity detection failed:', error);
      } finally {
        this.isDetectingSeverity = false;
      }
    }
  }

  onSeverityChange() {
    this.userModifiedSeverity = true;
  }

  submitIncident(form: NgForm): void {
    if (!form.valid) return;

    this.isSubmitting = true;
    this.incidentService.createIncident(this.incident).subscribe({
      next: () => {
        this.showSuccess('Incident reported successfully!');
        form.resetForm();
        this.resetForm();
      },
      error: (err) => {
        this.showError('Failed to submit incident: ' + this.getErrorMessage(err));
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.selectedProject = null;
    this.resetIncidentForm();
    this.resetDetectionState();
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

  private resetDetectionState(): void {
    this.autoDetectedSeverity = null;
    this.predictedSeverity = null;
    this.confidence = null;
    this.userModifiedSeverity = false;
    this.isDetectingSeverity = false;
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