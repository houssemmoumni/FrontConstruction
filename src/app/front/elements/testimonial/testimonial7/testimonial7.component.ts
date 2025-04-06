import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-testimonial7',
    imports: [
        NgFor,
        RouterLink,
        CarouselModule
    ],
    templateUrl: './testimonial7.component.html',
    styleUrl: './testimonial7.component.css'
})
export class Testimonial7Component {
  @Input() data : any;
  constructor() { }

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
    navText: ['<i class="la la-angle-left"></i>', '<i class="la la-angle-right"></i>'],
    responsive:{
      0:{
        items:1
      },
      480:{
        items:1
      },
      991:{
        items:1
      },
      1000:{
        items:1
      }
    },
  }
}
