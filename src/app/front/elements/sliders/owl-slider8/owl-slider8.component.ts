import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider8',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider8.component.html',
    styleUrl: './owl-slider8.component.css'
})
export class OwlSlider8Component {
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
    navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      1024: {
        items: 4
      },
      1200: {
        items: 4
      }
    },
  }


  slideStore = [
    {
      title: "Wind Turbines",
      image: "assets/images/our-work/solarplant/pic1.jpg",
    },
    {
      title: "Solar Panels",
      image: "assets/images/our-work/solarplant/pic2.jpg",
    },
    {
      title: "Maintenance",
      image: "assets/images/our-work/solarplant/pic3.jpg",
    },
    {
      title: "Installation",
      image: "assets/images/our-work/solarplant/pic4.jpg",
    },
  ]
}
