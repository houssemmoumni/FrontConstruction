import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink, Router } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { Role, WorkerFormData } from '../../../models/worker.model';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Worker } from '../../../models/worker.model';

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatSnackBarModule,
        RouterLink
    ],
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
    workerForm = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        role: [Role.TECHNICIEN, Validators.required],
        email: ['', [Validators.required, Validators.email]],        // Lowercase field name
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]], // Lowercase field name
        joindate: [new Date(), Validators.required]
    });

    roles = Object.values(Role);
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private workerService: WorkerService,
        private snackBar: MatSnackBar,
        private router: Router,
        public themeService: CustomizerSettingsService
    ) {}

    onSubmit(): void {
        if (this.workerForm.valid) {
            this.isSubmitting = true;
            const formValue = this.workerForm.getRawValue();
            
            const worker = {
                name: formValue.name,
                role: formValue.role,
                email: formValue.email,     // Use lowercase field names
                phone: formValue.phone,     // Use lowercase field names
                joindate: formValue.joindate.toISOString().split('T')[0]
            };

            this.workerService.createWorker(worker).subscribe({
                next: () => {
                    this.showMessage('Worker created successfully! 🎉');
                    // Fix: Update the navigation route to users list
                    this.router.navigate(['/users-page/users-list']);
                },
                error: (error) => {
                    console.error('Error creating worker:', error);
                    this.showMessage(
                        error.error?.message || 'Failed to create worker', 
                        true
                    );
                    this.isSubmitting = false;
                },
                complete: () => {
                    this.isSubmitting = false;
                }
            });
        }
    }

    private showMessage(message: string, isError = false) {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: isError ? ['error-snackbar'] : ['success-snackbar']
        });
    }
}