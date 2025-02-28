import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-testimonial5',
    imports: [
        NgFor,
        CarouselModule
    ],
    templateUrl: './testimonial5.component.html',
    styleUrl: './testimonial5.component.css'
})
export class Testimonial5Component {
  @Input() data: any;
  constructor() { }

  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    margin: 0,
    center: true,
    nav: true,
    dots: true,
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      991: {
        items: 3
      },
      1000: {
        items: 3
      }
    },
  }

  slideStore = [
    {
      title: "Agricultural Engineering",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic10.jpg",
      /* introtext: "Cafe & Restaurant", */
    },
    {
      title: "Rocky Forge Refinary",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic9.jpg",
      /* introtext: "Cafe & Restaurant", */
    },
    {
      title: "Power and Energy",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic8.jpg",
      /* introtext: "Cafe & Restaurant", */
    },
    {
      title: "Oil and Gas",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic7.jpg",
      /* introtext: "Cafe & Restaurant", */
    },

  ];
}
