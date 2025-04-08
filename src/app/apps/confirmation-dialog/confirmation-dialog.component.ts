import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false); // Ferme la boîte de dialogue sans confirmer
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Ferme la boîte de dialogue et confirme la suppression
  }
}
