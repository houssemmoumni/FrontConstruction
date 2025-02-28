import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer19Component } from '../../elements/footer/footer19/footer19.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { IconBox3Component } from '../../elements/icon-box/icon-box3/icon-box3.component';
declare var jQuery: any;

@Component({
    selector: 'app-shop-checkout',
    imports: [
        CurrencyPipe,
        HeaderLight3Component,
        Banner1Component,
        Footer19Component,
        IconBox3Component
    ],
    templateUrl: './shop-checkout.component.html',
    styleUrl: './shop-checkout.component.css'
})
export class ShopCheckoutComponent {
  banner: any = {
    pagetitle: "Checkout",
    bg_image: "assets/images/banner/bnr1.jpg",
    title: "Checkout",
  }
  constructor() { }

  ngOnInit(): void {
    (function ($) {
      jQuery('select').selectpicker();
    })(jQuery);
  }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  products = [
    {
      img: 'assets/images/product/item1.jpg',
      title: 'Prduct Item 1',
      price: 28
    },
    {
      img: 'assets/images/product/item2.jpg',
      title: 'Prduct Item 2',
      price: 36
    },
    {
      img: 'assets/images/product/item3.jpg',
      title: 'Prduct Item 3',
      price: 55
    },
    {
      img: 'assets/images/product/item4.jpg',
      title: 'Prduct Item 4',
      price: 28
    },
    {
      img: 'assets/images/product/item5.jpg',
      title: 'Prduct Item 5',
      price: 28
    },
  ]
}
