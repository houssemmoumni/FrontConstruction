import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
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
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-negociation-edit',
    standalone: true,
    imports: [
        CommonModule, // Ensure CommonModule is imported
        MatCardModule, MatMenuModule, MatButtonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, FileUploadModule, NgxEditorModule
    ],
    templateUrl: './Negociation-edit.component.html',
    styleUrls: ['./Negociation-edit.component.scss']
})
export class NegociationEditComponent implements OnInit, OnDestroy {

    editor!: Editor;
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
    private apiUrl = 'http://localhost:8890/gestionnegociation/api/phase1/negociations';

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private negociationService: NegociationService,
        public themeService: CustomizerSettingsService,
        private http: HttpClient
    ) {
        this.negociationForm = this.fb.group({
            phase: ['', Validators.required],
            status: ['', Validators.required],
            administrateur: this.fb.group({
                id: ['', Validators.required]
            }),
            architecte: this.fb.group({
                id: ['', Validators.required]
            }),
            ingenieurCivil: this.fb.group({
                id: ['', Validators.required]
            }),
        });
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.editor = new Editor();
        }

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.negociationService.getNegociationById(id).subscribe({
                next: (data: any) => {
                    this.negociationForm.patchValue({
                        phase: data.phase,
                        status: data.status,
                        administrateur: { id: data.administrateur?.id },
                        architecte: { id: data.architecte?.id },
                        ingenieurCivil: { id: data.ingenieurCivil?.id }
                    });
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
                this.http.put(`${this.apiUrl}/${id}`, this.negociationForm.value).subscribe({
                    next: () => {
                        console.log('Negociation updated successfully!');
                        alert('Négociation mise à jour avec succès !');
                        this.router.navigate(['/negociation-all-list']);
                    },
                    error: (error) => {
                        this.router.navigate(['/negociation-all-list']);
                    }
                });
            }
        } else {
            alert('Veuillez remplir tous les champs obligatoires correctement.');
        }
    }

    // File Uploader (You might not need this for this specific form)
    public multiple: boolean = false;

    // Instructor Select (You might not need this for this specific form)
    instructor = new FormControl('');
    instructorList: string[] = ['Ann Cohen', 'Lea Lewis', 'Lillie Walker', 'Lynn Flinn', 'Mark Rivera'];

    // Tags Select (You might not need this for this specific form)
    tags = new FormControl('');
    tagsList: string[] = ['Design', 'Writing', 'Security', 'Valuation', 'Angular'];
}