import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf, NgFor } from '@angular/common';
@Component({
  selector: 'app-edit-response-dialog',
  imports:[
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  standalone: true ,
  template: `
    <h2 mat-dialog-title>Modifier la réponse</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Réponse</mat-label>
        <textarea matInput [(ngModel)]="responseText" cdkTextareaAutosize></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Annuler</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="responseText" [disabled]="!responseText">
        Enregistrer
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      min-width: 400px;
    }
    textarea {
      min-height: 100px;
    }
  `]
})
export class EditResponseDialogComponent {
  responseText: string;

  constructor(
    public dialogRef: MatDialogRef<EditResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { response: string }
  ) {
    this.responseText = data.response;
  }
}
