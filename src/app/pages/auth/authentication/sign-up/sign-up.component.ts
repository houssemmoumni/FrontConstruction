import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Import MatCheckboxModule
import { CommonModule } from '@angular/common';
import { UserServicesService } from '../../../../services/user-services.service';
import { ThemeService } from '../../../../services/theme.service'; // Import ThemeService

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule // Add MatCheckboxModule to imports
  ]
})
export class SignupComponent {
  signupForm: FormGroup;
  message: string = '';
  isSuccess: boolean = false;
  hide = true;
  roles = ['ROLE_USER', 'ROLE_ARCHITECTE', 'ROLE_OUVRIER', 'ROLE_CHEF_PROJET'];

  constructor(
    private fb: FormBuilder,
    private userService: UserServicesService,
    private router: Router,
    public themeService: ThemeService // Inject ThemeService
  ) {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.signUp(this.signupForm.value).subscribe({
        next: (response) => {
          this.message = response.message;
          this.isSuccess = response.immediateAccess;
          if (this.isSuccess) {
            setTimeout(() => this.router.navigate(['/authentication']), 3000);
          }
        },
        error: (error) => {
          this.message = 'Erreur lors de l’inscription.';
          this.isSuccess = false;
          console.error(error);
        }
      });
    }
  }
}