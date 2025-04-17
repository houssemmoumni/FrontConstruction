import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="delete-dialog">
      <div class="dialog-icon">
        <mat-icon color="warn">warning</mat-icon>
      </div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this {{data.entityType}}?</p>
      <div class="dialog-actions">
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
    .dialog-icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }
    h2 {
      margin: 0 0 16px;
      color: #f44336;
    }
    p {
      margin: 0 0 24px;
      color: #666;
    }
    .dialog-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
  `]
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entityType: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
