import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider14',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider14.component.html',
    styleUrl: './owl-slider14.component.css'
})
export class OwlSlider14Component {

  constructor() { }

  customOptions: OwlOptions = {
    loop:true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    margin:0,
    nav:true,
    dots: false,
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
    responsive:{
      0:{
        items:1
      },
      480:{
        items:2
      },
      1024:{
        items:3
      },
      1200:{
        items:4
      }
    },
  }

  slideStore = [
    {
      title: "Plastics Institute",
      image: "assets/images/gallery/plastic/pic1.jpg",
    },
    {
      title: "Institute of Packaging",
      image: "assets/images/gallery/plastic/pic2.jpg",
    },
    {
      title: "Merchant's Chamber",
      image: "assets/images/gallery/plastic/pic3.jpg",
    },
    {
      title: "Chemical Council",
      image: "assets/images/gallery/plastic/pic4.jpg",
    },
  ]
}
