import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider7',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider7.component.html',
    styleUrl: './owl-slider7.component.css'
})
export class OwlSlider7Component {
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
      title: "Solar Panels",
      number: "1",
      class_name: "flaticon-worker",
    },
    {
      title: "Wind Turbines",
      number: "2",
      class_name: "flaticon-factory",
    },
    {
      title: "Maintenance",
      number: "3",
      class_name: "flaticon-settings",
    },
    {
      title: "Monitoring",
      number: "4",
      class_name: "flaticon-engineer-1",
    },
  ]
}
