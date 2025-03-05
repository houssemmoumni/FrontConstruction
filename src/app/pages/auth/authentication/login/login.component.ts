import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserServicesService } from '../../../../services/user-services.service';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Formulaire de connexion
      signinForm: FormGroup;
  
      // Masquer/afficher le mot de passe
      hide = true;
  
      constructor(
          private fb: FormBuilder, // Injection de FormBuilder
          private userService: UserServicesService,
          private router: Router,
          public themeService: CustomizerSettingsService, // Injection de themeService
          private tokenService: TokenService
  
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
                      this.tokenService.token = response.token as string; //save token
                      //localStorage.setItem('token', response.token); // Stocke le token dans le localStorage
                      this.router.navigate(['/users']); // Redirige vers le tableau de bord
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
