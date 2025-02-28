import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider5',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider5.component.html',
    styleUrl: './owl-slider5.component.css'
})
export class OwlSlider5Component {

  constructor() { }
  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    /* right:true, */
    margin: 30,
    nav: true,
    dots: false,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1,
        stagePadding: 60,
        margin: 15
      },
      480: {
        items: 1,
        margin: 15,
        stagePadding: 60
      },
      1024: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
  }

  slideStore = [
    {
      image: "assets/images/portfolio/construct/image_1.jpg",
    },
    {
      image: "assets/images/portfolio/construct/image_2.jpg",
    },
    {
      image: "assets/images/portfolio/construct/image_3.jpg",
    },
    {
      image: "assets/images/portfolio/construct/image_4.jpg",
    },

  ]
}
