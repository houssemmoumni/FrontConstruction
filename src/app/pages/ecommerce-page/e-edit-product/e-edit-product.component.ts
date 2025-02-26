import { Component, Inject, PLATFORM_ID,OnInit } from '@angular/core';
import { isPlatformBrowser, NgIf,CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink,Router, ActivatedRoute } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { MaterialService } from '../../../services/material.service';
import { MaterialRequest } from '../../../models/material-request';
import { MaterialStatus } from '../../../models/material-status';
import { Category } from '../../../models/category';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service'; // Import the service


@Component({
    selector: 'app-e-edit-product',
    imports: [CommonModule,MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule, NgIf],
    templateUrl: './e-edit-product.component.html',
    styleUrl: './e-edit-product.component.scss'
})
export class EEditProductComponent implements OnInit {

    // Select Value
    productTypeSelected = 'option1';
    brandTypeSelected = 'option1';
    categorySelected = 'option1';
    vendorSelected = 'option1';
    collectionSelected = 'option1';

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
        const materialId = this.route.snapshot.params['id'];
        this.loadCategories();
        this.loadMaterial(materialId);
    }
    loadMaterial(materialId: number): void {
        this.materialService.getMaterialById(materialId).subscribe({
            next: (data) => {
                const category = this.categories.find(cat => cat.name === data.categoryName);

                this.material = {
                    name: data.name,
                    description: data.description,
                    availableQuantity: data.availableQuantity,
                    price: data.price,
                    categoryId: category ? category.id : 1,
                    status: MaterialStatus[data.status as keyof typeof MaterialStatus],
                };
            },
            error: (error) => {
                console.error('Error fetching material:', error);
            },
        });
    }
    
    loadCategories(): void {
        this.materialService.getAllCategories().subscribe({
            next: (data) => {
                this.categories = data;
            },
            error: (error) => {
                console.error('Error fetching categories:', error);
            },
        });
    }
    onSubmit(): void {
        const materialId = this.route.snapshot.params['id'];
        this.materialService
            .updateMaterial(1, materialId, this.material)
            .subscribe({
                next: (response) => {
                    console.log('Material updated successfully:', response);
                    this.router.navigate(['/ecommerce-page/products-list']);
                },
                error: (error) => {
                    console.error('Error updating material:', error);
                },
            });
    }

    onCancel(): void {
        this.router.navigate(['/ecommerce-page/products-list']);
    }
    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId) && this.editor) {
            this.editor.destroy();
        }
    }
    material: MaterialRequest = {
        name: '',
        description: '',
        availableQuantity: 0,
        price: 0,
        categoryId: 1,
        status: MaterialStatus.DISPONIBLE,
    };

    categories: Category[] = [];
    materialStatuses: MaterialStatus[] = [
        MaterialStatus.DISPONIBLE,
        MaterialStatus.NON_DISPONIBLE,
        MaterialStatus.A_LOUER,
    ];
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object, private router: Router,
        private route: ActivatedRoute,
        private materialService: MaterialService
        ,        public themeService: CustomizerSettingsService // Inject the service

    ) {}

}