import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { contrat } from '../../../../../models/contrat.model';
import { MaintenanceService } from '../../../../../services/maintenance.service';
import { ContratService } from '../../../../../services/contrat.service';
import { Banner1Component } from '../../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../../elements/footer/footer13/footer13.component';

@Component({
  selector: 'app-create-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    Banner1Component,
    Footer13Component
  ],
  templateUrl: './create-maintenance.component.html',
  styleUrls: ['./create-maintenance.component.scss']
})
export class CreateMaintenanceComponent implements OnInit {
  maintenanceForm!: FormGroup;
  contrats: contrat[] = [];
  selectedFile: File | null = null;
  banner: any = {
    pagetitle: "Create Maintenance",
    bg_image: "assets/images/banner/bnr2.jpg",
    title: "Create Maintenance",
  };

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private contratService: ContratService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadContrats();
  }

  // Initialize form
  initForm() {
    this.maintenanceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      image: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrat: ['', Validators.required],
    });
  }

  // Load contrats
  loadContrats() {
    this.contratService.getAllContrats().subscribe({
      next: (data: contrat[]) => this.contrats = data,
      error: (err: any) => console.error('Error loading contrats:', err)
    });
  }

  // Handle file selection
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.maintenanceForm.patchValue({ image: reader.result as string });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Create maintenance
  createMaintenance() {
    if (this.maintenanceForm.valid) {
      const newMaintenance = {
        ...this.maintenanceForm.value,
        contrat: this.contrats.find(c => c.id === this.maintenanceForm.value.contrat) as contrat
      };

      this.maintenanceService.createMaintenance(newMaintenance).subscribe({
        next: () => {
          this.snackBar.open('Maintenance created successfully', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
          this.router.navigate(['/front']);
        },
        error: (err: any) => {
          console.error('Error creating maintenance:', err);
          this.snackBar.open('Error creating maintenance', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        }
      });
    }
  }
}