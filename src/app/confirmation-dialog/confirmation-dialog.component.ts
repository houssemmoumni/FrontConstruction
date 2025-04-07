import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { IncidentReport } from '../models/incident.model';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content>
      <p>{{data.message}}</p>
      <div *ngIf="data.incident" class="incident-details">
        <p><strong>Description:</strong> {{data.incident.description}}</p>
        <p><strong>Severity:</strong> {{data.incident.severity}}</p>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button color="primary" (click)="onYesClick()">Yes</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  styles: [`
    .incident-details {
      margin-top: 15px;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  `]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string;
      message: string;
      incident?: IncidentReport
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
