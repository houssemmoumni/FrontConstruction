import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ProjectManagementService } from '../../../services/project-management.service';
import { project } from '../../../models/projectt.model';

@Component({
    selector: 'app-project-assignment-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
    template: `
        <h2 mat-dialog-title>Assign Worker to Project</h2>
        <mat-dialog-content>
            <mat-form-field appearance="fill" class="w-100">
                <mat-label>Select Project</mat-label>
                <mat-select [(ngModel)]="selectedProjectId">
                    <mat-option *ngFor="let project of projects" [value]="project.projet_id">
                        {{project.projet_name}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="onCancel()">Cancel</button>
            <button mat-raised-button color="primary" [disabled]="!selectedProjectId" (click)="onAssign()">
                Assign
            </button>
        </mat-dialog-actions>
    `,
    styles: [`
        :host {
            display: block;
            padding: 20px;
        }
        mat-form-field {
            width: 100%;
            margin-bottom: 15px;
        }
        mat-dialog-actions {
            padding: 10px 0;
        }
    `]
})
export class ProjectAssignmentDialogComponent implements OnInit {
    projects: project[] = [];
    selectedProjectId: number | null = null;

    constructor(
        private dialogRef: MatDialogRef<ProjectAssignmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { workerId: number },
        private projectService: ProjectManagementService // Change this from WorkerService
    ) {}

    ngOnInit() {
        this.loadProjects();
    }

    loadProjects() {
        this.projectService.getAllProjects().subscribe({
            next: (projects) => {
                this.projects = projects;
                console.log('Loaded projects:', projects);
            },
            error: (error) => {
                console.error('Error loading projects:', error);
                // Show error in the dialog
                this.projects = [];
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onAssign(): void {
        if (this.selectedProjectId) {
            this.dialogRef.close(this.selectedProjectId);
        }
    }
}
