import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
declare  var jQuery:  any;

@Component({
    selector: 'app-owl-slider9',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider9.component.html',
    styleUrl: './owl-slider9.component.css'
})
export class OwlSlider9Component {
  constructor() { }

  customOptions: OwlOptions = {
    loop:true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    smartSpeed: 3000,
    autoplay: true,
    margin:0,
    nav:true,
    dots: true,
    navText: ['', ''],
    responsive:{
      0:{
        items:1
      },
      480:{
        items:1
      },
      1024:{
        items:1
      },
      1200:{
        items:1
      }
    },
  }

  slideStore = [
    {
      image: "assets/images/gallery/food/pic1.jpg",
    },
    {
      image: "assets/images/gallery/food/pic2.jpg",
    },
    {
      image: "assets/images/gallery/food/pic3.jpg",
    },
    {
      image: "assets/images/gallery/food/pic4.jpg",
    },
  ]

}
