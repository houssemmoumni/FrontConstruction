import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-owl-slider2',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './owl-slider2.component.html',
    styleUrl: './owl-slider2.component.css'
})
export class OwlSlider2Component {

  constructor() { }

  customOptions: OwlOptions = {
    loop:true,
    autoplaySpeed: 3000,
    navSpeed: 3000,
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
        items:4
      },
      1200:{
        items:4
      }
    },
  }

  slideStore = [
    {
      title: "Manufacturing",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic10.jpg",
    },
    {
      title: "Iron Making",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic9.jpg",
    },
    {
      title: "Steel Pipes",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic8.jpg",
    },
    {
      title: "Structural Steel",
      subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
      image: "assets/images/our-work/steelplant/pic7.jpg",
    },
  ]
}
