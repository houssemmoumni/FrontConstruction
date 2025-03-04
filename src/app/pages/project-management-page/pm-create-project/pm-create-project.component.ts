import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { AssuranceService } from '../../../../services/assurance.service';
import { assurance } from '../../../../models/assurance.model';

@Component({
    selector: 'app-pm-create-project',
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule, NgIf, MatSnackBarModule],
    templateUrl: './pm-create-project.component.html',
    styleUrl: './pm-create-project.component.scss'
})
export class PmCreateProjectComponent {

    // Text Editor
    editor!: Editor | null;  // Make it nullable
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

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            // Initialize the editor only in the browser
            this.editor = new Editor();
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    // File Uploader
    public multiple: boolean = false;

    assuranceForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        adresse: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        fax: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        logo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        siteWeb: ['', [Validators.required, Validators.pattern(/^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)]]
    });

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public themeService: CustomizerSettingsService,
        private assuranceService: AssuranceService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    createAssurance() {
        if (this.assuranceForm.valid) {
            const assuranceData: assurance = this.assuranceForm.value as assurance;
            this.assuranceService.createAssurance(assuranceData).subscribe({
                next: response => {
                    console.log('Assurance created:', response);
                    this.snackBar.open('Assurance created successfully', 'Close', {
                        duration: 3000,
                        panelClass: ['success-snackbar']
                    });
                    this.router.navigate(['/project-management-page/assurances-list']);
                },
                error: err => {
                    console.error('Error creating assurance:', err);
                    this.snackBar.open('Error creating assurance', 'Close', {
                        duration: 3000,
                        panelClass: ['error-snackbar']
                    });
                }
            });
        }
    }
}