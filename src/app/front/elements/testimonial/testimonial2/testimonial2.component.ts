import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-testimonial2',
    imports: [
        CarouselModule,
        NgFor,
    ],
    templateUrl: './testimonial2.component.html',
    styleUrl: './testimonial2.component.css'
})
export class Testimonial2Component {
  @Input() data : any;
  constructor() {

   }
   ngOnInit(): void {

  }

  customOptions: OwlOptions = {
    loop:true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    smartSpeed: 3000,
    autoplay: true,
    margin:0,
    center: true,
    dots: true,
    navText: ['', ''],
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
