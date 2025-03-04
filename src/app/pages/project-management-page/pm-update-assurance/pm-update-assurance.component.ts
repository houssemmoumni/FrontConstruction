import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AssuranceService } from '../../../../services/assurance.service';
import { assurance } from '../../../../models/assurance.model';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Editor, Toolbar, NgxEditorModule } from 'ngx-editor';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pm-update-assurance',
    imports: [MatCardModule, MatButtonModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FileUploadModule, NgxEditorModule, NgIf, MatSnackBarModule],
    templateUrl: './pm-update-assurance.component.html',
    styleUrl: './pm-update-assurance.component.scss'
})
export class PmUpdateAssuranceComponent implements OnInit, OnDestroy {
    assuranceForm!: FormGroup;
    editor!: Editor | null;
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private assuranceService: AssuranceService,
        private router: Router,
        private snackBar: MatSnackBar,
        public themeService: CustomizerSettingsService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit(): void {
        this.assuranceForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            adresse: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.email]],
            telephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
            fax: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
            logo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            siteWeb: ['', [Validators.required, Validators.pattern(/^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]]
        });

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.assuranceService.getAssuranceById(+id).subscribe({
                next: (assurance) => {
                    this.assuranceForm.patchValue(assurance);
                },
                error: (err) => {
                    console.error('Error loading assurance:', err);
                }
            });
        }

        if (isPlatformBrowser(this.platformId)) {
            this.editor = new Editor();
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    updateAssurance() {
        if (this.assuranceForm.valid) {
            const id = this.route.snapshot.paramMap.get('id');
            if (id) {
                const assuranceData: assurance = this.assuranceForm.value as assurance;
                this.assuranceService.updateAssurance(+id, assuranceData).subscribe({
                    next: (response) => {
                        console.log('Assurance updated:', response);
                        this.snackBar.open('Assurance updated successfully', 'Close', {
                            duration: 3000,
                            panelClass: ['success-snackbar']
                        });
                        this.router.navigate(['/project-management-page/assurances-list']);
                    },
                    error: (err) => {
                        console.error('Error updating assurance:', err);
                        this.snackBar.open('Error updating assurance', 'Close', {
                            duration: 3000,
                            panelClass: ['error-snackbar']
                        });
                    }
                });
            }
        }
    }
}