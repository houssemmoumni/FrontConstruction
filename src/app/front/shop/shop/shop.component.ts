import { Component } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Footer19Component } from '../../elements/footer/footer19/footer19.component';
import { IconBox3Component } from '../../elements/icon-box/icon-box3/icon-box3.component';

interface type {
  img: string,
  title: string,
  offer_price: string,
  price: string,
  rating: number
}
@Component({
    selector: 'app-shop',
    imports: [
        RouterLink,
        NgClass,
        CurrencyPipe,
        HeaderLight3Component,
        Banner1Component,
        Footer19Component,
        IconBox3Component
    ],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.css'
})
export class ShopComponent {
  banner: any = {
    pagetitle: "Shop Grid 4",
    bg_image: "assets/images/banner/bnr4.jpg",
    title: "Shop Grid 4",
  }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  products:type[] = [
    {
      img: 'assets/images/product/item1.jpg',
      title: 'School Bag',
      offer_price: '232',
      price: '192',
      rating :5
    },
    {
      img: 'assets/images/product/item2.jpg',
      title: 'Color Pencils',
      offer_price: '232',
      price: '192',
      rating :2
    },
    {
      img: 'assets/images/product/item3.jpg',
      title: 'Pencils',
      offer_price: '232',
      price: '192',
      rating :3
    },
    {
      img: 'assets/images/product/item4.jpg',
      title: 'Stapler',
      offer_price: '232',
      price: '192',
      rating :5
    },
    {
      img: 'assets/images/product/item5.jpg',
      title: 'Project Book',
      offer_price: '232',
      price: '192',
      rating :5
    },
    {
      img: 'assets/images/product/item6.jpg',
      title: 'Colorful Book',
      offer_price: '232',
      price: '192',
      rating :4
    },
    {
      img: 'assets/images/product/item7.jpg',
      title: 'Notebook',
      offer_price: '232',
      price: '192',
      rating :3
    },
    {
      img: 'assets/images/product/item8.jpg',
      title: 'Project file',
      offer_price: '232',
      price: '192',
      rating :4
    },
    {
      img: 'assets/images/product/item9.jpg',
      title: 'Calculator',
      offer_price: '232',
      price: '192',
      rating :5
    },
    {
      img: 'assets/images/product/item1.jpg',
      title: 'School Bag',
      offer_price: '232',
      price: '192',
      rating :3
    },
    {
      img: 'assets/images/product/item2.jpg',
      title: 'Color Pencils',
      offer_price: '232',
      price: '192',
      rating :1
    },
    {
      img: 'assets/images/product/item3.jpg',
      title: 'Pencils',
      offer_price: '232',
      price: '192',
      rating :3
    },
  ]
}
