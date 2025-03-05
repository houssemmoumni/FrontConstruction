import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
declare var jQuery: any;
@Component({
    selector: 'app-owl-slider1',
    imports: [
        RouterLink,
        CarouselModule,
        NgFor,
    ],
    templateUrl: './owl-slider1.component.html',
    styleUrl: './owl-slider1.component.css'
})
export class OwlSlider1Component {
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
    navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      1024: {
        items: 3
      },
      1200: {
        items: 3
      }
    },
  }

}
