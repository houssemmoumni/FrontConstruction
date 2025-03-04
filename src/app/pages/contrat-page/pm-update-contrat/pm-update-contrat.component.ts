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
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule } from 'ngx-editor';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContratService } from '../../../../services/contrat.service';
import { AssuranceService } from '../../../../services/assurance.service';
import { ProjetService } from '../../../../services/projet.service';

@Component({
  selector: 'app-pm-update-contrat',
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
    MatSnackBarModule,
    RouterLink,
    FileUploadModule,
    NgxEditorModule,
  ],
  templateUrl: './pm-update-contrat.component.html',
  styleUrls: ['./pm-update-contrat.component.scss']
})
export class PmUpdateContratComponent implements OnInit {
  contratForm!: FormGroup;
  assurances: any[] = [];
  projets: any[] = [];
  contratId!: number;
  originalSignatureDate!: Date;

  constructor(
    private fb: FormBuilder,
    private contratService: ContratService,
    private assuranceService: AssuranceService,
    private projetService: ProjetService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadAssurances();
    this.loadProjets();
    this.loadContrat();
  }

  // Initialize form
  initForm() {
    this.contratForm = this.fb.group({
      contratcondition: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      date_signature: ['', [Validators.required, this.newSignatureDateValidator()]],
      date_expiration: ['', [Validators.required, this.expirationDateValidator()]],
      assurance: ['', Validators.required],
      projet: ['', Validators.required]
    });
  }

  // Load assurances
  loadAssurances() {
    this.assuranceService.getAllAssurances().subscribe({
      next: data => this.assurances = data,
      error: err => console.error('Error loading assurances:', err)
    });
  }

  // Load projects
  loadProjets() {
    this.projetService.getAllProjets().subscribe({
      next: data => this.projets = data,
      error: err => console.error('Error loading projects:', err)
    });
  }

  // Load contract details
  loadContrat() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contratId = +id;
      this.contratService.getContratById(this.contratId).subscribe({
        next: contrat => {
          if (contrat) {
            this.originalSignatureDate = new Date(contrat.date_signature);
            this.contratForm.patchValue({
              contratcondition: contrat.contratcondition,
              date_signature: contrat.date_signature,
              date_expiration: contrat.date_expiration,
              assurance: contrat.assurance?.id || null,
              projet: contrat.projet?.id || null
            });
          }
        },
        error: err => console.error('Error loading contract:', err)
      });
    }
  }

  // Update contract
  updateContrat() {
    if (this.contratForm.valid) {
      const updatedContrat = {
        contratcondition: this.contratForm.value.contratcondition,
        date_signature: this.contratForm.value.date_signature,
        date_expiration: this.contratForm.value.date_expiration,
        assurance: this.assurances.find(a => a.id === this.contratForm.value.assurance),
        projet: this.projets.find(p => p.id === this.contratForm.value.projet)
      };

      this.contratService.updateContrat(this.contratId, updatedContrat).subscribe({
        next: () => {
          this.snackBar.open('Contract updated successfully', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
          this.router.navigate(['/contrat-page/contrats-list']);
        },
        error: err => {
          console.error('Error updating contract:', err);
          this.snackBar.open('Error updating contract', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
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

  newSignatureDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const date = new Date(control.value);
      return date >= this.originalSignatureDate ? null : { invalidNewSignatureDate: 'New signature date must be after the original signature date' };
    };
  }
}