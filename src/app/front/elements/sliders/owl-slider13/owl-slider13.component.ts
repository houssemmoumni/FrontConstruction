import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider13',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider13.component.html',
    styleUrl: './owl-slider13.component.css'
})
export class OwlSlider13Component {
  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000,
    slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    /* right:true, */
    margin: 0,
    nav: true,
    dots: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      1024: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
  }

  slideStore = [
    {
      image: "assets/images/gallery/leather/pic1.jpg",
    },
    {
      image: "assets/images/gallery/leather/pic2.jpg",
    },
    {
      image: "assets/images/gallery/leather/pic3.jpg",
    },
    {
      image: "assets/images/gallery/leather/pic4.jpg",
    },

  ]
}
