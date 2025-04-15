import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReponseService } from '../../services/reponse.service';
import { Reponse } from '../../models/reponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reponse-form',
  imports: [MatCardModule,MatIconModule, MatMenuModule, MatButtonModule, RouterLink, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './reponse-form.component.html',
  styleUrls: ['./reponse-form.component.css'],
})
export class ReponseFormComponent implements OnInit {
  reply: Reponse = {
    idreponse: 0,
    titre: '',
    reponse: '',
    date_reponse: '',
   // reclamation: null,
  };
  selectedReclamationId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reponseService: ReponseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selectedReclamationId = +this.route.snapshot.paramMap.get('id')!;
  }

  submitReply(): void {
    if (this.selectedReclamationId === null) {
      this.snackBar.open('Erreur : Aucune réclamation sélectionnée', 'Fermer', {
        duration: 3000,
      });
      return;
    }

    const userId = 2; // À remplacer par l'ID utilisateur réel

    // Créer un payload simplifié
    const payload = {
      titre: this.reply.titre,
      reponse: this.reply.reponse
      // Ne pas inclure idreponse, date_reponse ni reclamation
    };

    this.reponseService.addReponse(payload, this.selectedReclamationId, userId).subscribe({
      next: () => {
        this.snackBar.open('Réponse envoyée avec succès', 'Fermer', {
          duration: 3000,
        });
        this.router.navigate(['/reclamation']);
      },
      error: (error) => {
        console.error('Erreur détaillée:', error);

        let errorMessage = 'Erreur lors de l\'envoi de la réponse';
        if (error.status === 409) {
          errorMessage = 'Conflit de version - Veuillez rafraîchir et réessayer';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        this.snackBar.open(`Erreur: ${errorMessage}`, 'Fermer', {
          duration: 5000, // Durée plus longue pour les erreurs
        });
      }
    });
  }
  cancelReply(): void {
    this.router.navigate(['/reclamation']); // Rediriger vers la liste des réclamations
  }
}
