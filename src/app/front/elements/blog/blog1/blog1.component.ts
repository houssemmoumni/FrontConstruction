import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-blog1',
    imports: [
        RouterLink,
        CarouselModule
    ],
    templateUrl: './blog1.component.html',
    styleUrl: './blog1.component.css'
})
export class Blog1Component {
  constructor() { }

  customOptions: OwlOptions = {
    loop:true,
    autoplaySpeed: 1000,
    navSpeed: 1000,
    /* paginationSpeed: 3000, */
    /* slideSpeed: 3000, */
    smartSpeed: 1000,
    autoplay: true,
    margin:30,
    nav:false,
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

  blogs = [
    {
      title: "Plastics Institute",
      blog_image: "assets/images/blog/latest-blog/pic1.jpg",
      post_date:"<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "demongo",
      post_title: "Why You Should Not Go To Industry",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      title: "Plastics Institute",
      blog_image: "assets/images/blog/latest-blog/pic2.jpg",
      post_date:"<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "AARON",
      post_title: "Seven Doubts You Should Clarify About",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      title: "Plastics Institute",
      blog_image: "assets/images/blog/latest-blog/pic3.jpg",
      post_date:"<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "VICTORIA",
      post_title: "Seven Outrageous Ideas Industry",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
  ]

  ngOnInit(): void {}
}
