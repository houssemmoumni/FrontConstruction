import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="delete-dialog">
      <div class="dialog-icon">
        <mat-icon color="warn" class="warning-icon">warning</mat-icon>
      </div>
      <h2 mat-dialog-title>Confirm Delete</h2>
      <div mat-dialog-content>
        <p>Are you sure you want to delete this worker?</p>
        <p class="warning-text">This action cannot be undone.</p>
      </div>
      <div mat-dialog-actions align="center">
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button mat-raised-button color="warn" (click)="onYesClick()">
          <mat-icon>delete</mat-icon>
          Delete
        </button>
      </div>
    </div>
  `,
  styles: [`
    .delete-dialog {
      padding: 20px;
      text-align: center;
    }
    .dialog-icon {
      margin-bottom: 16px;
    }
    .warning-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #f44336;
    }
    h2 {
      margin: 0;
      color: #f44336;
      font-size: 24px;
    }
    p {
      margin: 16px 0;
      color: #666;
      font-size: 16px;
    }
    .warning-text {
      color: #f44336;
      font-size: 14px;
      font-style: italic;
    }
    .mat-dialog-actions {
      margin-top: 24px;
      gap: 16px;
      justify-content: center;
    }
  `]
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
