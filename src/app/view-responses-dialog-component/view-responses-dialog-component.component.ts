import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from '../services/reclamation.service';
import { ReponseService } from '../services/reponse.service';
import { Reclamation } from '../models/reclamation.model';
import { Reponse } from '../models/reponse.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditResponseDialogComponent } from '../edit-response-dialog/edit-response-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';




import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-responses-dialog-component',
  standalone: true,
  imports: [
    CommonModule ,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule ,
    MatProgressSpinnerModule,
    FormsModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './view-responses-dialog-component.component.html',
  styleUrl: './view-responses-dialog-component.component.scss'
})
export class ViewResponsesDialogComponentComponent implements OnInit {
[x: string]: any;


    reclamation: Reclamation | undefined;
  reponses: Reponse[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private reponseService: ReponseService,
    private location: Location,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const reclamationId = +id;
      this.loadReclamation(reclamationId);
      this.loadReponses(reclamationId);
    }
  }

  getStatusClass(status: string | null | undefined): string {
    if (!status) {
      return 'badge-default';
    }

    switch (status.toLowerCase()) {
      case 'en cours':
        return 'badge-pending';
      case 'résolu':
        return 'badge-resolved';
      case 'fermé':
        return 'badge-closed';
      default:
        return 'badge-default';
    }
  }



  loadReclamation(id: number): void {
    this.reclamationService.getReclamationById(id).subscribe(
      (data: Reclamation) => {
        this.reclamation = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de la réclamation', error);
      }
    );
  }

  loadReponses(reclamationId: number): void {
    this.reponseService.getReponsesByReclamation(reclamationId).subscribe(
      (data: Reponse[]) => {
        this.reponses = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des réponses', error);
        this.isLoading = false;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }


// Dans view-responses-dialog-component.component.ts

editReponse(reponse: Reponse): void {
    const dialogRef = this.dialog.open(EditResponseDialogComponent, {
      width: '500px',
      data: { response: reponse.reponse }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result !== reponse.reponse) {
        this.isLoading = true;
        const userId = 1; // À remplacer par l'ID de l'utilisateur connecté

        this.reponseService.updateReponse(
          reponse.idreponse!,
          { reponse: result },
          userId
        ).subscribe({
          next: () => {
            if (this.reclamation?.idreclamation) {
              this.loadReponses(this.reclamation.idreclamation);
            }
            this.snackBar.open('Réponse mise à jour avec succès', 'Fermer', {
              duration: 3000,
              panelClass: 'success-snackbar'
            });
          },
          error: (err) => {
            console.error('Erreur lors de la modification', err);
            this.isLoading = false;
            this.snackBar.open(err.message || 'Erreur lors de la mise à jour', 'Fermer', {
              duration: 5000, // Plus long pour permettre la lecture
              panelClass: 'error-snackbar'
            });
          }
        });
      }
    });
  }

  deleteReponse(reponseId: number): void {
    const dialogRef = this['dialog'].open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette réponse ?'
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isLoading = true;
        const userId = 1; // À remplacer par l'ID de l'utilisateur connecté

        this.reponseService.deleteReponse(reponseId, userId).subscribe({
          next: () => {
            if (this.reclamation?.idreclamation) {
              this.loadReponses(this.reclamation.idreclamation);
            }
            this['snackBar'].open('Réponse supprimée avec succès', 'Fermer', {
              duration: 3000,
              panelClass: 'success-snackbar'
            });
          },
          error: (err) => {
            console.error('Erreur lors de la suppression', err);
            this.isLoading = false;
            this['snackBar'].open('Erreur lors de la suppression', 'Fermer', {
              duration: 3000,
              panelClass: 'error-snackbar'
            });
          }
        });
      }
    });
  }
}

