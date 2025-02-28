import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-testimonial4',
    imports: [
        NgFor,
        RouterLink,
        CarouselModule
    ],
    templateUrl: './testimonial4.component.html',
    styleUrl: './testimonial4.component.css'
})
export class Testimonial4Component {
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
    margin: 30,
    nav: true,
    dots: false,
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      767: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
  }

}
