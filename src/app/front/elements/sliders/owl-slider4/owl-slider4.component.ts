import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider4',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider4.component.html',
    styleUrl: './owl-slider4.component.css'
})
export class OwlSlider4Component {

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
        items:3
      },
      1024:{
        items:4
      },
      1200:{
        items:4
      }
    },
  }

  slideStore = [
    {
      title: "Agricultural Engineering",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic10.jpg",
    },
    {
      title: "Rocky Forge Refinary",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic9.jpg",
    },
    {
      title: "Power and Energy",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic8.jpg",
    },
    {
      title: "Oil and Gas",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic7.jpg",
    }
  ]
}
