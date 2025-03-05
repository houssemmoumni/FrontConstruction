import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserServicesService } from '../../services/user-services.service';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service'; // Importez le service

@Component({
    selector: 'app-sign-in',
    standalone: true, // Ajoutez ceci pour un composant standalone
    imports: [
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    // Formulaire de connexion
    signinForm: FormGroup;

    // Masquer/afficher le mot de passe
    hide = true;

    constructor(
        private fb: FormBuilder, // Injection de FormBuilder
        private userService: UserServicesService,
        private router: Router,
        public themeService: CustomizerSettingsService // Injection de themeService

    ) {
        // Initialisation du formulaire
        this.signinForm = this.fb.group({
            email: ['',[Validators.required, Validators.email]],
            motDePasse: ['', Validators.required]
        });
    }

    // Soumission du formulaire
    onSubmit() {
        if (this.signinForm.valid) {
            const signInData = this.signinForm.value; // Récupère les valeurs du formulaire
            this.userService.signIn(signInData).subscribe({
                next: (response) => {
                    console.log('Connexion réussie', response);
                    localStorage.setItem('token', response.token); // Stocke le token dans le localStorage
                    this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord
                },
                error: (error) => {
                    console.error('Erreur lors de la connexion', error);
                    alert('Erreur lors de la connexion');
                }
            });
        } else {
            alert('Veuillez remplir correctement le formulaire.');
        }
    }
}