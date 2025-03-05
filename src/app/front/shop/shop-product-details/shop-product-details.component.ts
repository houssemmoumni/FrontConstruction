import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer19Component } from '../../elements/footer/footer19/footer19.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { IconBox3Component } from '../../elements/icon-box/icon-box3/icon-box3.component';
import { OwlSlider15Component } from '../../elements/sliders/owl-slider15/owl-slider15.component';
declare var jQuery: any;
declare var handleowlCarousel: any;

@Component({
    selector: 'app-shop-product-details',
    imports: [
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
export class ShopProductDetailsComponent {
  banner: any = {
    pagetitle: "Product Details",
    bg_image: "assets/images/banner/bnr5.jpg",
    title: "About us 1",
  }
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        handleowlCarousel();
      })(jQuery);
    }, 100);

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
  }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
