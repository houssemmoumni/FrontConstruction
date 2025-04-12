import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { Role } from '../../../models/worker.model';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-edit-user',
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
        MatProgressSpinnerModule,
        RouterLink
    ],
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    workerId!: number;
    workerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        role: [Role.TECHNICIEN, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,}$')]],
        joindate: [new Date(), Validators.required]
    });

    roles = Object.values(Role);
    isLoading = true;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private workerService: WorkerService,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
        public themeService: CustomizerSettingsService
    ) {}

    ngOnInit(): void {
        this.workerId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadWorker();
    }

    private loadWorker(): void {
        this.workerService.getWorkerById(this.workerId).subscribe({
            next: (worker) => {
                this.workerForm.patchValue({
                    name: worker.name,
                    role: worker.role as Role,
                    email: worker.email,
                    phone: worker.phone,
                    joindate: new Date(worker.joindate)
                });
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading worker:', error);
                this.showMessage('Failed to load worker details', true);
                this.router.navigate(['/users-page/users-list']);
            }
        });
    }

    onSubmit(): void {
        if (this.workerForm.valid) {
            this.isSubmitting = true;
            const formValue = this.workerForm.getRawValue();
            
            const worker = {
                id: this.workerId,
                name: formValue.name!,
                role: formValue.role!,
                email: formValue.email!,
                phone: formValue.phone!,
                joindate: formValue.joindate!.toISOString().split('T')[0]
            };

            this.workerService.updateWorker(worker).subscribe({
                next: () => {
                    this.showMessage('Worker updated successfully! 🎉');
                    this.router.navigate(['/users-page/users-list']);
                },
                error: (error) => {
                    console.error('Error updating worker:', error);
                    this.showMessage(error.error?.message || 'Failed to update worker', true);
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
