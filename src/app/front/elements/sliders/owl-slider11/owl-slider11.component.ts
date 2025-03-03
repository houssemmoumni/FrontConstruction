import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider11',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider11.component.html',
    styleUrl: './owl-slider11.component.css'
})
export class OwlSlider11Component {
  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    // responsive:true,
    margin: 30,
    nav: false,
    dots: false,
    navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2,
        margin: 15
      },
      700: {
        items: 2,
        margin: 15
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
      title: "Growing Fruits and Vegetables",
      image: "assets/images/project/pic1.jpg",
    },
    {
      title: "Clear Water for Irrigation",
      image: "assets/images/project/pic2.jpg",
    },
    {
      title: "Spring & Fall Cleanup",
      image: "assets/images/project/pic3.jpg",
    },
  ]
}
