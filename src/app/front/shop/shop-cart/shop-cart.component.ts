import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer19Component } from '../../elements/footer/footer19/footer19.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { IconBox3Component } from '../../elements/icon-box/icon-box3/icon-box3.component';
declare  var jQuery:  any;

interface type {
  img: string,
  title: string,
  unitPrice: number,
  price: number,
  quantity: string
}
@Component({
    selector: 'app-shop-cart',
    imports: [
        CurrencyPipe,
        HeaderLight3Component,
        Banner1Component,
        Footer19Component,
        IconBox3Component
    ],
    templateUrl: './shop-cart.component.html',
    styleUrl: './shop-cart.component.css'
})
export class ShopCartComponent {

	banner : any = {
		pagetitle: "Cart",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Shop Cart",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  constructor() { }

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
	}

  product_list: type[] = [
    {
      img: 'assets/images/product/thumb/item1.jpg',
      title: 'Prduct Item 1',
      unitPrice: 20,
      price: 20,
      quantity: '1'
    },
    {
      img: 'assets/images/product/thumb/item2.jpg',
      title: 'Prduct Item 2',
      unitPrice: 66,
      price: 66,
      quantity: '1'
    },
    {
      img: 'assets/images/product/thumb/item3.jpg',
      title: 'Prduct Item 3',
      unitPrice: 58,
      price: 58,
      quantity: '1'
    },
    {
      img: 'assets/images/product/thumb/item4.jpg',
      title: 'Prduct Item 4',
      unitPrice: 28,
      price: 28,
      quantity: '2'
    },
    {
      img: 'assets/images/product/thumb/item5.jpg',
      title: 'Prduct Item 5',
      unitPrice: 38,
      price: 38,
      quantity: '1'
    }
  ]
}
