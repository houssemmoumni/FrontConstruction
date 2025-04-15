import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { HeaderLight3Component } from '../../../app/front/elements/header/header-light3/header-light3.component';
import { Footer13Component } from '../../../app/front/elements/footer/footer13/footer13.component';
import { ReclamationService } from '../../services/reclamation.service';
import { Router } from '@angular/router';
import { Reclamation } from '../../models/reclamation.model';

@Component({
  selector: 'app-reclamation-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderLight3Component, Footer13Component],
  templateUrl: './reclamation-add.component.html',
  styleUrls: ['./reclamation-add.component.css'],
})
export class ReclamationAddComponent {
  email1 = 'contact@example.com';
  reclamationForm: FormGroup;
  message: string = '';

  constructor(
    private reclamationService: ReclamationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.reclamationForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      type: ['', [Validators.required, Validators.pattern(/^(Technique|Administratif|Autre)$/)]]
    });
  }

  scroll_top() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit() {
    if (this.reclamationForm.invalid) {
      this.markFormGroupTouched(this.reclamationForm);
      this.message = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    const reclamationData: Reclamation = {
      ...this.reclamationForm.value,
      dateReclamation: new Date().toISOString(),
      status: 'En attente',
      user: null,
      idreclamation: 0
    };

    const userId = 1; // À remplacer par l'ID de l'utilisateur connecté

    this.reclamationService.addReclamation(reclamationData, userId).subscribe(
      (response) => {
        console.log('Réclamation envoyée:', response);
        this.message = 'Réclamation envoyée avec succès!';
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get f() {
    return this.reclamationForm.controls;
  }
}
