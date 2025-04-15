
import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { Reclamation } from '../models/reclamation.model';
import { HeaderLight3Component } from "../front/elements/header/header-light3/header-light3.component";
import { CommonModule } from '@angular/common';
import { Footer13Component } from "../front/elements/footer/footer13/footer13.component";
import { Reponse } from '../models/reponse.model'; // à créer si pas encore fait


@Component({
  selector: 'app-mes-reclamations',
  standalone: true,
  imports: [HeaderLight3Component, CommonModule, Footer13Component],
  templateUrl: './mes-reclamations.component.html',
  styleUrl: './mes-reclamations.component.scss'
})
export class MesReclamationsComponent implements OnInit {
    reclamations: Reclamation[] = [];
    reponsesMap: { [key: number]: Reponse[] } = {};

    constructor(private reclamationService: ReclamationService) {}

    ngOnInit(): void {
      this.loadReclamations();
    }

    loadReclamations(): void {
      const userId = 1; // À remplacer par l'ID de l'utilisateur connecté
      this.reclamationService.getReclamationsByUser(userId).subscribe(
        (data) => {
          this.reclamations = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des réclamations:', error);
        }
      );
    }
    toggleReponses(reclamationId: number): void {
        console.log('Toggling responses for reclamation:', reclamationId);

        if (this.reponsesMap[reclamationId]) {
          delete this.reponsesMap[reclamationId];
        } else {
          this.reclamationService.getReponsesByReclamation(reclamationId).subscribe({
            next: (data) => {
              console.log('Responses received:', data);
              this.reponsesMap[reclamationId] = data || [];
            },
            error: (error) => {
              console.error('Error loading responses:', error);
              this.reponsesMap[reclamationId] = [];
            }
          });
        }
      }



      editReclamation(reclamation: any) {
        // Implémentez la logique d'édition
        console.log('Édition de la réclamation:', reclamation);
        // Vous pouvez ouvrir un modal ou naviguer vers une page d'édition
      }

      confirmDelete(reclamationId: number) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette réclamation ?')) {
          this.deleteReclamation(reclamationId);
        }
      }

      deleteReclamation(reclamationId: number) {
        // Implémentez la suppression via votre service
        this.reclamationService.deleteReclamation(reclamationId).subscribe(
          () => {
            // Recharger les données ou filtrer le tableau local
            this.reclamations = this.reclamations.filter(r => r.idreclamation !== reclamationId);
            alert('Réclamation supprimée avec succès');
          },
          error => {
            console.error('Erreur lors de la suppression:', error);
            alert('Échec de la suppression');
          }
        );
      }

    }



