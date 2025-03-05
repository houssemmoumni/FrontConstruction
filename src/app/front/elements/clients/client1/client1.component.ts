import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-client1',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './client1.component.html',
    styleUrl: './client1.component.css'
})
export class Client1Component {
  @Input() data: any;
  constructor() { }

  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 4000,
    navSpeed: 4000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 4000,
    autoplay: true,
    margin: 30,
    nav: true,
    dots: false,
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      550: {
        items: 3
      },
      1024: {
        items: 5
      },
      1200: {
        items: 5
      }
    },
  }
}
