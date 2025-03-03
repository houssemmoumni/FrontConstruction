import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-team9',
    imports: [
        NgFor,
        RouterLink,
        CarouselModule
    ],
    templateUrl: './team9.component.html',
    styleUrl: './team9.component.css'
})
export class Team9Component {
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
    nav: true,
    dots: true,
    navText: ['<i class="la la-arrow-left"></i>', '<i class="la la-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      700: {
        items: 2
      },
      1024: {
        items: 3
      },
      1200: {
        items: 4
      }
    },
  }
}
