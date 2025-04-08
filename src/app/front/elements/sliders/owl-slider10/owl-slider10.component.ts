import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider10',
    imports: [
        CarouselModule
    ],
    templateUrl: './owl-slider10.component.html',
    styleUrl: './owl-slider10.component.css'
})
export class OwlSlider10Component {
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
    dots: true,
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
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
      title: "We Believe That Everyone Has Got Talent!",
      image: "assets/images/main-slider/slide15.jpg",
      introtext: "Our Development model is based on the enterprising ability we give to our teams in diverse activities.",
    },
    {
      title: "We Believe That Everyone Has Got Talent!",
      image: "assets/images/main-slider/slide16.jpg",
      introtext: "Our Development model is based on the enterprising ability we give to our teams in diverse activities.",
    },
    {
      title: "We Believe That Everyone Has Got Talent!",
      image: "assets/images/main-slider/slide17.jpg",
      introtext: "Our Development model is based on the enterprising ability we give to our teams in diverse activities.",
    },

  ]
}
