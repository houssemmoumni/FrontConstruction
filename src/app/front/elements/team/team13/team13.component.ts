import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-team13',
    imports: [
        NgFor,
        RouterLink,
        CarouselModule
    ],
    templateUrl: './team13.component.html',
    styleUrl: './team13.component.css'
})
export class Team13Component {

  @Input() data: any;
  constructor() { }

  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000,
    slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    /* right:true, */
    margin: 30,
    center: true,
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

      991: {
        items: 2
      },
      1000: {
        items: 3
      }
    },
  }
}
