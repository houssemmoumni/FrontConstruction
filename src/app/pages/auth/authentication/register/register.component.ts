import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { UserServicesService } from '../../../../services/user-services.service';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
      ReactiveFormsModule,
      RouterModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatCheckboxModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
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
