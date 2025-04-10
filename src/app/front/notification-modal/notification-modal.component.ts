import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-modal',
  template: `
    <div style="padding: 20px; max-width: 400px;">
      <h2 style="color: #3f51b5;">Détails de la notification</h2>

      <div style="margin: 20px 0;">
        <p>{{ data.notification.message }}</p>

        <!-- Bouton principal pour voir l'entretien -->
        <button *ngIf="data.notification.interview_id"
                mat-raised-button
                color="primary"
                style="width: 100%; margin: 15px 0;"
                (click)="goToInterview()">
          Voir les détails de l'entretien
        </button>
      </div>

      <!-- Bouton Fermer -->
      <button mat-button mat-dialog-close style="float: right;">
        Fermer
      </button>
    </div>
  `
})
export class NotificationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  goToInterview() {
    if (this.data.notification.interview_id) {
      this.router.navigate(['/entretien', this.data.notification.interview_id]);
    } else {
      console.error('Aucun ID d\'entretien trouvé dans la notification');
    }
  }
}
