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

@Component({
  selector: 'app-view-responses-dialog-component',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule ,
    MatProgressSpinnerModule
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
    private location: Location
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
}

