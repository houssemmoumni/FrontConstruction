import { Component } from '@angular/core';
import { HeaderLight15Component } from '../elements/header/header-light15/header-light15.component';
import { Slider8Component } from '../elements/rev-slider/slider8/slider8.component';
import { OwlSlider13Component } from '../elements/sliders/owl-slider13/owl-slider13.component';
import { ServicesElement11Component } from '../elements/services/services-element11/services-element11.component';
import { Gallery5Component } from '../elements/gallery/gallery5/gallery5.component';
import { Counter1Component } from '../elements/counter/counter1/counter1.component';
import { Team11Component } from '../elements/team/team11/team11.component';
import { Testimonial9Component } from '../elements/testimonial/testimonial9/testimonial9.component';
import { Blog3Component } from '../elements/blog/blog3/blog3.component';
import { Footer7Component } from '../elements/footer/footer7/footer7.component';

@Component({
    selector: 'app-home-leather-industry',
    imports: [
        HeaderLight15Component,
        Slider8Component,
        OwlSlider13Component,
        ServicesElement11Component,
        Gallery5Component,
        Counter1Component,
        Team11Component,
        Testimonial9Component,
        Blog3Component,
        Footer7Component,
    ],
    templateUrl: './home-leather-industry.component.html',
    styleUrl: './home-leather-industry.component.css'
})
export class HomeLeatherIndustryComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  blogs: any = [
    {
      blog_image: "assets/images/our-work/leather/pic1.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>demongo</a>",
      post_title: "Why You Should Not Go To Industry",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/our-work/leather/pic2.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>AARON</a>",
      post_title: "Seven Doubts You Should Clarify About",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/our-work/leather/pic3.jpg",
      post_date: "<strong>12 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>VICTORIA</a>",
      post_title: "Seven Outrageous Ideas Industry",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
  ];

  our_team = [
    {
      section_title: "Our Team",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",

      team: [
        {
          name: "Marco Datella",
          role: "Designer",
          image: "assets/images/our-team/pic2.jpg",
          social_link: [
            {
              title: "facebook",
              icon_class: "fa-facebook",
              link: "https://www.facebook.com/dexignzone",
            },
            {
              title: "twitter",
              icon_class: "fa-twitter",
              link: "https://twitter.com/dexignzones",
            },
            {
              title: "linkedin",
              icon_class: "fa-linkedin",
              link: "https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title: "pinterest",
              icon_class: "fa-pinterest",
              link: "https://www.pinterest.com/dexignzone/",
            }
          ]
        },
        {
          name: "Konne Backfield",
          role: "Developer",
          image: "assets/images/our-team/pic3.jpg",
          social_link: [
            {
              title: "facebook",
              icon_class: "fa-facebook",
              link: "https://www.facebook.com/dexignzone",
            },
            {
              title: "twitter",
              icon_class: "fa-twitter",
              link: "https://twitter.com/dexignzones",
            },
            {
              title: "linkedin",
              icon_class: "fa-linkedin",
              link: "https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title: "pinterest",
              icon_class: "fa-pinterest",
              link: "https://www.pinterest.com/dexignzone/",
            }
          ]
        },
        {
          name: "Nashid Martines",
          role: "Manager",
          image: "assets/images/our-team/pic4.jpg",
          social_link: [
            {
              title: "facebook",
              icon_class: "fa-facebook",
              link: "https://www.facebook.com/dexignzone",
            },
            {
              title: "twitter",
              icon_class: "fa-twitter",
              link: "https://twitter.com/dexignzones",
            },
            {
              title: "linkedin",
              icon_class: "fa-linkedin",
              link: "https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title: "pinterest",
              icon_class: "fa-pinterest",
              link: "https://www.pinterest.com/dexignzone/",
            }
          ]
        },
      ]
    }
  ];

  testimonials = [
    {
      section_title: "Testimonials",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      testimonial: [
        {
          name: "David Matin",
          role: "Student",
          image: "",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley.",
        },
      ]
    }
  ];

}
