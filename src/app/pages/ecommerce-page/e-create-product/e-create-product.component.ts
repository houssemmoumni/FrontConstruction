import {OnInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router,RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MaterialStatus } from '../../../models/material-status';
import { Category } from '../../../models/category';
import { MaterialRequest } from '../../../models/material-request';
import { MaterialService } from '../../../services/material.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Optional: For displaying validation messages



@Component({
    selector: 'app-e-create-product',
    imports: [CommonModule,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, 
        FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
         MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule, NgIf],
    templateUrl: './e-create-product.component.html',
    styleUrl: './e-create-product.component.scss'
})
export class ECreateProductComponent implements OnInit{
    form!: FormGroup;


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
    material: MaterialRequest = {
        name: '',
        description: '',
        availableQuantity: 0,
        price: 0,
        categoryId: 1,
        status: MaterialStatus.DISPONIBLE // Default status
    };
    selectedFile!: File;

    categories: Category[] = [];

    materialStatuses: MaterialStatus[] = [
        MaterialStatus.DISPONIBLE,
        MaterialStatus.NON_DISPONIBLE,
        MaterialStatus.A_LOUER
    ];

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            // Initialize the editor only in the browser
            this.editor = new Editor();
        }
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            availableQuantity: [0, [Validators.required, Validators.min(1)]],
            price: [0, [Validators.required, Validators.min(1)]],
            categoryId: ['', Validators.required],
            status: ['', Validators.required],
        });
        this.materialService.getAllCategories().subscribe({
            next: (data) => {
                this.categories = data;
            },
            error: (error) => {
                console.error('Error fetching categories:', error);
            }
        });
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public themeService: CustomizerSettingsService,
        private materialService: MaterialService,
        private router: Router,
        private snackBar: MatSnackBar, // Optional: For displaying validation messages
        private fb: FormBuilder,


    ) {}
    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (file) {
            this.selectedFile = file;

        }
    }
    onSubmit(): void {

        if (this.form.invalid) {
            this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
            return;
        }
    
        // Update the material object with form values
        this.material = {
            name: this.form.value.name,
            description: this.form.value.description,
            availableQuantity: this.form.value.availableQuantity,
            price: this.form.value.price,
            categoryId: this.form.value.categoryId,
            status: this.form.value.status,
        };
        const formData = new FormData();
        
        formData.append('request', new Blob([JSON.stringify(this.material)], { type: 'application/json' }));
        formData.append('file', this.selectedFile);
    
        this.materialService.createMaterial(1,formData).subscribe({
            next: (response) => {
                this.snackBar.open('Material created successfully!', 'Close', { duration: 3000 });
                this.router.navigate(['/ecommerce-page/products-list']);
            },
            error: (error) => {
                console.error('Error creating material:', error);
                this.snackBar.open('Error creating material. Please try again.', 'Close', { duration: 3000 });

            }
        });
    }
   
    onCancel(): void {
        this.router.navigate(['/ecommerce-page/products-list']); // Navigate to materials list
    }
}