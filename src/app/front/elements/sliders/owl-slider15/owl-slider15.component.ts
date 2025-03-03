import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider15',
    imports: [
        RouterLink,
        CarouselModule,
        NgFor,
        NgIf
    ],
    templateUrl: './owl-slider15.component.html',
    styleUrl: './owl-slider15.component.css'
})
export class OwlSlider15Component {
  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    margin: 30,
    nav: true,
    dots: false,
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      1024: {
        items: 4
      },
      1200: {
        items: 4
      }
    },
  };

  related_products = [
    {
      section_title: "Related Products",
      products: [
        {
          title: "Product Title",
          image: "assets/images/product/item1.jpg",
          price: "$232",
          sale_price: "$192",
          sale: false,
          cart_link: [
            {
              title: "cart",
              icon_class: "ti-shopping-cart",
              link: "shop-cart",
            },
            {
              title: "view",
              icon_class: "ti-eye",
              link: "javascript:void(0);",
            },
            {
              title: "wishlist",
              icon_class: "ti-heart",
              link: "javascript:void(0);",
            },
          ]
        },
        {
          title: "Product Title",
          image: "assets/images/product/item2.jpg",
          price: "$232",
          sale_price: "$192",
          sale: true,
          cart_link: [
            {
              title: "cart",
              icon_class: "ti-shopping-cart",
              link: "shop-cart",
            },
            {
              title: "view",
              icon_class: "ti-eye",
              link: "javascript:void(0);",
            },
            {
              title: "wishlist",
              icon_class: "ti-heart",
              link: "javascript:void(0);",
            },
          ]
        },
        {
          title: "Product Title",
          image: "assets/images/product/item3.jpg",
          price: "$232",
          sale_price: "$192",
          sale: true,
          cart_link: [
            {
              title: "cart",
              icon_class: "ti-shopping-cart",
              link: "shop-cart",
            },
            {
              title: "view",
              icon_class: "ti-eye",
              link: "javascript:void(0);",
            },
            {
              title: "wishlist",
              icon_class: "ti-heart",
              link: "javascript:void(0);",
            },
          ]
        },
        {
          title: "Product Title",
          image: "assets/images/product/item4.jpg",
          price: "$232",
          sale_price: "$192",
          sale: true,
          cart_link: [
            {
              title: "cart",
              icon_class: "ti-shopping-cart",
              link: "shop-cart",
            },
            {
              title: "view",
              icon_class: "ti-eye",
              link: "javascript:void(0);",
            },
            {
              title: "wishlist",
              icon_class: "ti-heart",
              link: "javascript:void(0);",
            },
          ]
        },
      ]
    }
  ];
}
