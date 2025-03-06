import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-negociation-add',
  standalone: true, // Mark the component as standalone
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule // Add MatCardModule to imports
  ], // Add necessary modules to imports
  templateUrl: './Negociation-ADD.component.html',
  styleUrls: ['./Negociation-ADD.component.scss']
})
export class NegociationAddComponent implements OnInit {
  negociationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public themeService: CustomizerSettingsService
  ) {
    this.negociationForm = this.fb.group({
      clientId: ['', Validators.required],
      adminId: ['', Validators.required],
      budgetEstime: ['', Validators.required],
      exigences: ['', Validators.required],
      statut: ['', Validators.required],
      dateCreation: ['', Validators.required],
      dateFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.negociationForm.valid) {
      this.http.post('http://localhost:8066/api/negociations', this.negociationForm.value)
        .subscribe({
          next: () => this.router.navigate(['/negociation-all-list']),
          error: (error) => console.error('Erreur lors de la création de la négociation', error)
        });
    }
  }
}
