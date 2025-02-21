import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider6',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider6.component.html',
    styleUrl: './owl-slider6.component.css'
})
export class OwlSlider6Component {

  customOptions: OwlOptions = {
    loop: true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 3000,
    autoplay: true,
    /* right:true, */
    margin: 0,
    nav: true,
    dots: false,
    navText: ['<i class="la la-arrow-left"></i> Prev', 'Next <i class="la la-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1
      },
      1024: {
        items: 1
      },
      1200: {
        items: 1
      }
    },
  }

  slideStore = [
    {
      client: "Ethan Hunt",
      completion: "February 5th, 2024",
      project_type: "Villa, Residence",
      architects: "Logan Cee",
      image: "assets/images/our-services/construct/pic1.jpg",
    },
    {
      client: "Ethan Hunt",
      completion: "February 5th, 2024",
      project_type: "Villa, Residence",
      architects: "Logan Cee",
      image: "assets/images/our-services/construct/pic1.jpg",
    },

  ]
}
