import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-blog3',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './blog3.component.html',
    styleUrl: './blog3.component.css'
})
export class Blog3Component {
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
    dots: false,
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
    responsive:{
      0:{
        items:1
      },
      480:{
        items:2
      },
      1024:{
        items:3
      },
      1200:{
        items:3
      }
    },
  }
}
