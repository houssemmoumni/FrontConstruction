import { Component } from '@angular/core';
import { HeaderLight19Component } from '../elements/header/header-light19/header-light19.component';
import { Slider12Component } from '../elements/rev-slider/slider12/slider12.component';
import { QueryForm1Component } from '../elements/forms/query-form1/query-form1.component';
import { Content9Component } from '../elements/content-box/content9/content9.component';
import { ServicesElement17Component } from '../elements/services/services-element17/services-element17.component';
import { Blog5Component } from '../elements/blog/blog5/blog5.component';
import { Team15Component } from '../elements/team/team15/team15.component';
import { Testimonial2Component } from '../elements/testimonial/testimonial2/testimonial2.component';
import { CallToAction2Component } from '../elements/call-to-action/call-to-action2/call-to-action2.component';
import { Footer15Component } from '../elements/footer/footer15/footer15.component';

@Component({
    selector: 'app-home-car-industry',
    imports: [
        HeaderLight19Component,
        Slider12Component,
        QueryForm1Component,
        Content9Component,
        ServicesElement17Component,
        Blog5Component,
        Team15Component,
        Testimonial2Component,
        CallToAction2Component,
        Footer15Component
    ],
    templateUrl: './home-car-industry.component.html',
    styleUrl: './home-car-industry.component.css'
})
export class HomeCarIndustryComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  blogs: any = [
    {
      blog_image: "assets/images/our-work/car/pic1.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Jack</a>",
      post_title: "Seven Doubts You Should",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/our-work/car/pic2.jpg",
      post_date: "<strong>11 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Zachary</a>",
      post_title: "The Shocking Revelation",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/our-work/car/pic3.jpg",
      post_date: "<strong>12 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Charlotte</a>",
      post_title: "The Story Of Industry",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
  ];

  our_team = [
    {
      section_title: "Meet The Team",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been.",

      team: [
        {
          name: "Nashid Martines",
          role: "Director",
          image: "assets/images/our-team/car/pic1.jpg",
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
          role: "Marketing",
          image: "assets/images/our-team/car/pic2.jpg",
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
          name: "Hackson Willingham",
          role: "Sales Manager",
          image: "assets/images/our-team/car/pic3.jpg",
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
          role: "Marketing",
          image: "assets/images/our-team/car/pic4.jpg",
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
      section_title: "Happy Customers Said",
      section_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",

      testimonial: [
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic1.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic2.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic3.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
      ]
    }
  ];
}
