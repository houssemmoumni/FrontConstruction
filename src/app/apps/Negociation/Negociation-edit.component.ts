import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { NegociationService } from './negociation.service';

@Component({
    selector: 'app-negociation-edit',
    standalone: true,
    imports: [
        MatCardModule, MatMenuModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FileUploadModule, NgxEditorModule
    ],
    templateUrl: './Negociation-edit.component.html',
    styleUrls: ['./Negociation-edit.component.scss']
})
export class NegociationEditComponent implements OnInit {

    // Text Editor
    editor!: Editor;  // Remove nullability
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

    negociationForm: FormGroup;
    errorMessage: string = '';

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private negociationService: NegociationService,
        public themeService: CustomizerSettingsService
    ) {
        this.negociationForm = this.fb.group({
            clientId: ['', Validators.required],
            adminId: ['', Validators.required],
            budgetEstime: ['', Validators.required],
            exigences: ['', Validators.required],
            statut: ['', Validators.required],
            dateCreation: ['', Validators.required],
            dateFin: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            // Initialize the editor only in the browser
            this.editor = new Editor();
        }

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.negociationService.getNegociationById(id).subscribe({
                next: (data: any) => {
                    this.negociationForm.patchValue(data);
                },
                error: (error) => {
                    this.errorMessage = error;
                }
            });
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    onSaveChanges(): void {
        if (this.negociationForm.valid) {
            const id = this.route.snapshot.paramMap.get('id');
            if (id) {
                this.negociationService.updateNegociation(id, this.negociationForm.value).subscribe({
                    next: () => {
                        this.router.navigate(['/negociation-all-list']);
                    },
                    error: (error) => {
                        this.errorMessage = error;
                    }
                });
            }
        }
    }

    // File Uploader
    public multiple: boolean = false;

    // Instructor Select
    instructor = new FormControl('');
    instructorList: string[] = ['Ann Cohen', 'Lea Lewis', 'Lillie Walker', 'Lynn Flinn', 'Mark Rivera'];

    // Tags Select
    tags = new FormControl('');
    tagsList: string[] = ['Design', 'Writing', 'Security', 'Valuation', 'Angular'];

    // New properties
    clientId!: number;
    adminId!: number;
    budgetEstime!: number;
    exigences!: string;
    statut!: string;
    dateCreation!: Date;
    dateFin!: Date;
}
