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

@Component({
  selector: 'app-reponse-form',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './reponse-form.component.html',
  styleUrls: ['./reponse-form.component.css'],
})
export class ReponseFormComponent implements OnInit {
  reply: Reponse = {
    idreponse: 0,
    titre: '',
    reponse: '',
    date_reponse: '',
    reclamation: null,
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
        console.error('Aucune réclamation sélectionnée');
        this.snackBar.open('Erreur : Aucune réclamation sélectionnée', 'Fermer', {
            duration: 3000,
        });
        return;
    }

    const userId = 1; // Remplacez par l'ID de l'utilisateur connecté

    // Créez un objet Reponse complet
    const payload: Reponse = {
        idreponse: 0, // Valeur par défaut, car l'ID sera généré côté serveur
        titre: this.reply.titre,
        reponse: this.reply.reponse,
        date_reponse: new Date().toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
        reclamation: null, // Vous pouvez laisser cela à null ou l'initialiser correctement
    };

    this.reponseService.addReponse(payload, this.selectedReclamationId, userId).subscribe(
        () => {
            this.snackBar.open('Réponse envoyée avec succès', 'Fermer', {
                duration: 3000,
            });
            this.router.navigate(['/reclamation']);
        },
        (error: any) => {
            console.error('Erreur lors de l\'envoi de la réponse', error);
            const errorMessage = error.error?.message || 'Erreur inconnue';
            this.snackBar.open(`Erreur : ${errorMessage}`, 'Fermer', {
                duration: 3000,
            });
        }
    );
}
  cancelReply(): void {
    this.router.navigate(['/reclamation']); // Rediriger vers la liste des réclamations
  }
}
