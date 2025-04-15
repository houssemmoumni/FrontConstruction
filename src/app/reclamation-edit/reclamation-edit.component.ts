import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderLight3Component } from '../../app/front/elements/header/header-light3/header-light3.component';
import { Footer13Component } from '../../app/front/elements/footer/footer13/footer13.component';
import { ReclamationService } from '../services/reclamation.service';
import { NgForm } from '@angular/forms';
import { Reclamation } from '../models/reclamation.model';

@Component({
  selector: 'app-reclamation-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderLight3Component, Footer13Component],
  templateUrl: './reclamation-edit.component.html',
  styleUrls: ['./reclamation-edit.component.scss'],
})
export class ReclamationEditComponent implements OnInit {
  email1 = 'contact@example.com';
  reclamation: Reclamation = {
    titre: '',
    description: '',
    type: '',
    dateReclamation: new Date().toISOString(),
    status: 'En attente',
    user: null,
    idreclamation: 0
  };
  message: string = '';
  isSuccess: boolean = false;
  isAdmin: boolean = false; // À définir selon le rôle de l'utilisateur

  constructor(
    private reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadReclamation(id);

    // Vérifier le rôle de l'utilisateur
    // this.isAdmin = this.authService.isAdmin();
  }

  loadReclamation(id: number): void {
    this.reclamationService.getReclamationById(id).subscribe(
      (data) => {
        this.reclamation = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de la réclamation:', error);
        this.message = 'Erreur lors du chargement de la réclamation';
        this.isSuccess = false;
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.message = 'Veuillez remplir tous les champs correctement.';
      this.isSuccess = false;
      return;
    }

    const userId = 1; // À remplacer par l'ID de l'utilisateur connecté

    this.reclamationService.updateReclamation(
      this.reclamation.idreclamation!,
      this.reclamation,
      userId
    ).subscribe(
      (response) => {
        this.message = 'Réclamation mise à jour avec succès!';
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['front/reclamation']);
        }, 2000);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour:', error);
        this.message = error.message || 'Erreur lors de la mise à jour de la réclamation';
        this.isSuccess = false;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['front/reclamation']);
  }

  scroll_top(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
