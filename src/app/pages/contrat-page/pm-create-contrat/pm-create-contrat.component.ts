import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule } from 'ngx-editor';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContratService } from '../../../../services/contrat.service';
import { AssuranceService } from '../../../../services/assurance.service';
import { ProjetService } from '../../../../services/projet.service';

@Component({
  selector: 'app-pm-create-contrat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule, // ✅ Add this to imports
    RouterLink,
    FileUploadModule,
    NgxEditorModule,
  ],
  templateUrl: './pm-create-contrat.component.html',
  styleUrls: ['./pm-create-contrat.component.scss']
})
export class PmCreateContratComponent implements OnInit {
  contratForm!: FormGroup;
  assurances: any[] = [];
  projets: any[] = [];
  contrats: any[] = [];

  constructor(
    private fb: FormBuilder,
    private contratService: ContratService,
    private assuranceService: AssuranceService,
    private projetService: ProjetService,
    private snackBar: MatSnackBar // ✅ Injected here
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadAssurances();
    this.loadProjets();
    this.loadContrats();
  }

  // Initialize form
  initForm() {
    this.contratForm = this.fb.group({
      contratcondition: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      date_signature: ['', [Validators.required, this.dateValidator()]],
      date_expiration: ['', [Validators.required, this.expirationDateValidator()]],
      assurance: ['', Validators.required],
      projet: ['', Validators.required]
    });
  }

  // Load assurances
  loadAssurances() {
    this.assuranceService.getAllAssurances().subscribe({
      next: data => {
        this.assurances = data;
        console.log('Assurances chargées :', this.assurances);
      },
      error: err => console.error('Erreur lors du chargement des assurances :', err)
    });
  }

  // Load projects
  loadProjets() {
    this.projetService.getAllProjets().subscribe({
      next: data => {
        this.projets = data;
        console.log('Projets chargés :', this.projets);
      },
      error: err => console.error('Erreur lors du chargement des projets :', err)
    });
  }

  // Load contracts
  loadContrats() {
    this.contratService.getAllContrats().subscribe({
      next: (data: any[]) => {
        this.contrats = data;
        console.log('Contrats rechargés :', this.contrats);
      },
      error: (err: any) => console.error('Erreur lors du chargement des contrats :', err)
    });
  }

  // Create contract
  createContrat() {
    if (this.contratForm.valid) {
      const contratData = {
        contratcondition: this.contratForm.value.contratcondition,
        date_signature: this.contratForm.value.date_signature,
        date_expiration: this.contratForm.value.date_expiration,
        assurance: this.assurances.find(a => a.id === this.contratForm.value.assurance),
        projet: this.projets.find(p => p.id === this.contratForm.value.projet),
      };

      console.log('Données envoyées au backend :', contratData);

      this.contratService.createContrat(contratData).subscribe({
        next: (response: any) => {
          console.log('Contrat créé avec succès :', response);
          this.contratForm.reset();
          this.loadContrats(); // Refresh contract list

          this.snackBar.open('Contrat ajouté avec succès', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: (err: any) => {
          console.error('Erreur lors de la création du contrat :', err);

          this.snackBar.open('Erreur lors de la création du contrat', 'Fermer', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  dateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const date = new Date(control.value);
      const now = new Date();
      return date >= now ? null : { invalidDate: 'Date must be today or later' };
    };
  }

  expirationDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control.parent as FormGroup;
      if (formGroup) {
        const startDate = new Date(formGroup.get('date_signature')?.value);
        const endDate = new Date(control.value);
        return endDate > startDate ? null : { invalidExpirationDate: 'Expiration date must be after the signature date' };
      }
      return null;
    };
  }
}