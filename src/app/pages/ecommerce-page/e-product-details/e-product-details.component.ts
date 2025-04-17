import { NgFor } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CarouselModule } from 'ngx-owl-carousel-o'; // Import CarouselModule
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

import { MaterialService } from '../../../services/material.service';
import { MaterialResponse } from '../../../models/material-response';

@Component({
    selector: 'app-e-product-details',
    imports: [CommonModule,RouterLink, MatCardModule, MatMenuModule, MatButtonModule, CarouselModule, NgFor, FormsModule, MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, StarRatingComponent, MatProgressBarModule],
    templateUrl: './e-product-details.component.html',
    styleUrl: './e-product-details.component.scss'
})
export class EProductDetailsComponent implements OnInit {
    material!: MaterialResponse;
    isLoading: boolean = true; // Loading state
    productImages: { url: string }[] = []; // Dynamic images for the carousel
    selectedImage!: string; // Currently selected image



    // Star Rating
    selectedRating: number = 2;

    // Input Counter
    value = 1;
    increment() {
        this.value++;
    }
    decrement() {
        if (this.value > 1) {
            this.value--;
        }
    }

    // // Product Images
    // productImages = [
    //     {
    //         url: 'images/products/product-details1.jpg'
    //     },
    //     {
    //         url: 'images/products/product-details2.jpg'
    //     },
    //     {
    //         url: 'images/products/product-details3.jpg'
    //     },
    //     {
    //         url: 'images/products/product-details4.jpg'
    //     }
    // ]
    // selectedImage!: string;
    // changeimage(image: string){
    //     this.selectedImage = image;
    // }

    constructor(
        public themeService: CustomizerSettingsService,
        private route: ActivatedRoute,
        private materialService: MaterialService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        const materialId = this.route.snapshot.paramMap.get('id');
        if (materialId) {
            this.loadMaterialDetails(+materialId);
        } else {
            this.router.navigate(['/ecommerce-page/products-list']); // Redirect if no ID
        }
    }

    loadMaterialDetails(materialId: number): void {
        this.materialService.getMaterialById(materialId).subscribe({
            next: (material: MaterialResponse) => {
                console.log('Material Details:', material); // Debugging line
                this.material = material;
                this.productImages = material.image ? [{ url: material.image.url }] : [];
                this.selectedImage = this.productImages[0]?.url;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error fetching material details:', error); // Debugging line
                this.isLoading = false;
                this.router.navigate(['/ecommerce-page/products-list']); // Redirect on error
            }
        });
    }

    changeImage(image: string): void {
        this.selectedImage = image;
    }

    goBack(): void {
        this.router.navigate(['/ecommerce-page/products-list']);
    }

}
