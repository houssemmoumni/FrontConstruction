import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MaintenanceService } from '../../../../services/maintenance.service';
import { ContratService } from '../../../../services/contrat.service';
import { maintenance } from '../../../../models/maintenance';
import { contrat } from '../../../../models/contrat.model';

@Component({
  selector: 'app-pm-update-maintenance',
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
  templateUrl: './pm-update-maintenance.component.html',
  styleUrls: ['./pm-update-maintenance.component.scss']
})
export class PmUpdateMaintenanceComponent implements OnInit {
  maintenanceForm!: FormGroup;
  contrats: contrat[] = [];
  maintenanceId!: number;
  selectedFile: File | null = null;
  statusOptions: string[] = ['EN_ATTENTE', 'EN_COURS', 'TERMINE'];

  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService,
    private contratService: ContratService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadContrats();
    this.loadMaintenance();
  }

  // Initialize form
  initForm() {
    this.maintenanceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      image: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrat: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  // Load contrats
  loadContrats() {
    this.contratService.getAllContrats().subscribe({
      next: data => this.contrats = data,
      error: err => console.error('Error loading contrats:', err)
    });
  }

  // Load maintenance details
  loadMaintenance() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.maintenanceId = +id;
      this.maintenanceService.getMaintenanceById(this.maintenanceId).subscribe({
        next: maintenance => {
          if (maintenance) {
            this.maintenanceForm.patchValue({
              title: maintenance.title,
              description: maintenance.description,
              image: maintenance.image,
              email: maintenance.email,
              contrat: maintenance.contrat?.id || null,
              status: maintenance.status
            });
          }
        },
        error: err => console.error('Error loading maintenance:', err)
      });
    }
  }

  // Handle file selection
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = (e.target as FileReader).result as string;
        this.maintenanceForm.patchValue({ image: base64String });
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  

  // Update maintenance
  updateMaintenance() {
    if (this.maintenanceForm.valid) {
      const updatedMaintenance: maintenance = {
        ...this.maintenanceForm.value,
        id: this.maintenanceId,
        contrat: this.contrats.find(c => c.id === this.maintenanceForm.value.contrat) as contrat
      };

      this.maintenanceService.updateMaintenance(this.maintenanceId, updatedMaintenance).subscribe({
        next: () => {
          this.snackBar.open('Maintenance updated successfully', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
          this.router.navigate(['/maintenance-page/maintenances-list']);
        },
        error: err => {
          console.error('Error updating maintenance:', err);
          this.snackBar.open('Error updating maintenance', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        }
      });
    }
  }
}