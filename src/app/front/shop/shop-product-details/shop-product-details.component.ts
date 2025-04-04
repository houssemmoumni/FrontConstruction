import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer19Component } from '../../elements/footer/footer19/footer19.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { IconBox3Component } from '../../elements/icon-box/icon-box3/icon-box3.component';
import { OwlSlider15Component } from '../../elements/sliders/owl-slider15/owl-slider15.component';
import { ActivatedRoute } from '@angular/router';
import { MaterialService } from '../../../services/material.service';
import { MaterialResponse } from '../../../models/material-response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

declare var jQuery: any;
declare var handleowlCarousel: any;

@Component({
    selector: 'app-shop-product-details',
    imports: [
      CommonModule,
        RouterLink,
        HeaderLight3Component,
        Banner1Component,
        Footer19Component,
        IconBox3Component,
        OwlSlider15Component
    ],
    templateUrl: './shop-product-details.component.html',
    styleUrl: './shop-product-details.component.css'
})
export class ShopProductDetailsComponent implements OnInit {
  material: MaterialResponse | undefined;
  isLoading: boolean = true; // Loading state
    productImages: { url: string }[] = []; // Dynamic images for the carousel
    selectedImage!: string; // Currently selected image

  banner: any = {
    pagetitle: "Product Details",
    bg_image: "assets/images/banner/bnr5.jpg",
    title: "About us 1",
  }
  constructor( private route: ActivatedRoute,
    private materialService: MaterialService,        private router: Router,
    ) { }

  ngOnInit(): void {
    

    setTimeout(() => {
      (function ($) {
        jQuery("input[name='demo_vertical2']").TouchSpin({
          verticalbuttons: true,
          verticalupclass: 'ti-plus',
          verticaldownclass: 'ti-minus'
        });
        jQuery('select').selectpicker();
      })(jQuery);
    }, 100);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMaterialDetails(+id);
    }
  }
  loadMaterialDetails(id: number): void {
    this.materialService.getMaterialById(id).subscribe({
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
        }
    });
}

changeImage(image: string): void {
    this.selectedImage = image;
}

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
