import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider12',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider12.component.html',
    styleUrl: './owl-slider12.component.css'
})
export class OwlSlider12Component {

  customOptions: OwlOptions = {
    loop: true,
    margin: 20,
    center: true,
    nav: true,
    dots: false,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    navText: ['<i class="la la-long-arrow-left"></i>', '<i class="la la-long-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      1024: {
        items: 2
      },
      1200: {
        items: 2
      }
    },
  }

  slideStore = [
    {
      title: "Growing Fruits and Vegetables",
      image: "assets/images/our-services/ship/pic1.jpg",
      introtext: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry.",
    },
    {
      title: "Clear Water for Irrigation",
      image: "assets/images/our-services/ship/pic2.jpg",
      introtext: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry.",
    },
    {
      title: "Spring & Fall Cleanup",
      image: "assets/images/our-services/ship/pic3.jpg",
      introtext: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry.",
    },
  ]
}
