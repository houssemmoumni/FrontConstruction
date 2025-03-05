import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-testimonial6',
    imports: [
        NgFor,
        CarouselModule
    ],
    templateUrl: './testimonial6.component.html',
    styleUrl: './testimonial6.component.css'
})
export class Testimonial6Component {
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
    margin:30,
    nav:true,
    dots: true,
    navText: ['<i class="ti-arrow-circle-left"></i>', '<i class="ti-arrow-circle-right"></i>'],
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
