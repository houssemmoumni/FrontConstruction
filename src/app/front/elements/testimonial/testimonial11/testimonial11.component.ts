import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-testimonial11',
    imports: [
        NgFor,
        RouterLink,
        CarouselModule
    ],
    templateUrl: './testimonial11.component.html',
    styleUrl: './testimonial11.component.css'
})
export class Testimonial11Component {
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
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
    responsive:{
      0:{
        items:1
      },
      480:{
        items:2
      },
      991:{
        items:2
      },
      1000:{
        items:3
      }
    },
  }
}
