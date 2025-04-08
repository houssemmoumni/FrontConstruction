import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { HeaderLight3Component } from '../../../app/front/elements/header/header-light3/header-light3.component';
import { Footer13Component } from '../../../app/front/elements/footer/footer13/footer13.component';
import { ReclamationService } from '../../services/reclamation.service';
import { NgForm } from '@angular/forms';
import { Reclamation } from '../../models/reclamation.model';

@Component({
  selector: 'app-reclamation-add',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderLight3Component, Footer13Component],
  templateUrl: './reclamation-add.component.html',
  styleUrls: ['./reclamation-add.component.css'],
})
export class ReclamationAddComponent {
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
    router: any;

  scroll_top() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  constructor(private reclamationService: ReclamationService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.message = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    const userId = 1; // À remplacer par l'ID de l'utilisateur connecté

    this.reclamationService.addReclamation(this.reclamation, userId).subscribe(
      (response) => {
        console.log('Réclamation envoyée:', response);
        this.message = 'Réclamation envoyée avec succès!';
        // Redirection vers la liste des réclamations après 2 secondes
        setTimeout(() => {
          this.router.navigate(['front/reclamation']);
        }, 2000);
      },
      (error) => {
        console.error("Erreur lors de l'envoi de la réclamation:", error);
        this.message = "Erreur lors de l'envoi de la réclamation. Veuillez réessayer plus tard.";
      }
    );
  }
}
