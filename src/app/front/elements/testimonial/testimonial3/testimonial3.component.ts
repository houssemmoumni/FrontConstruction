import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-testimonial3',
    imports: [
        NgFor,
        CarouselModule
    ],
    templateUrl: './testimonial3.component.html',
    styleUrl: './testimonial3.component.css'
})
export class Testimonial3Component {
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
    center: false,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive:{
      0:{
        items:1
      },
      480:{
        items:1
      },
      1024:{
        items:1
      },
      1200:{
        items:1
      }
    },
  }
  slideStore = [
    {
      title: "Agricultural Engineering",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic10.jpg"
    },
    {
      title: "Rocky Forge Refinary",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic9.jpg"
    },
    {
      title: "Power and Energy",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic8.jpg"
    },
    {
      title: "Oil and Gas",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic7.jpg"
    },

  ];
}
