import { Component } from '@angular/core';
import { HeaderLight12Component } from '../elements/header/header-light12/header-light12.component';
import { Slider7Component } from '../elements/rev-slider/slider7/slider7.component';
import { CallToAction6Component } from '../elements/call-to-action/call-to-action6/call-to-action6.component';
import { OwlSlider9Component } from '../elements/sliders/owl-slider9/owl-slider9.component';
import { Gallery1Component } from '../elements/gallery/gallery1/gallery1.component';
import { Gallery2Component } from '../elements/gallery/gallery2/gallery2.component';
import { ServicesElement8Component } from '../elements/services/services-element8/services-element8.component';
import { Team8Component } from '../elements/team/team8/team8.component';
import { Testimonial6Component } from '../elements/testimonial/testimonial6/testimonial6.component';
import { Blog3Component } from '../elements/blog/blog3/blog3.component';
import { Footer6Component } from '../elements/footer/footer6/footer6.component';

@Component({
    selector: 'app-home-food-industry',
    imports: [
        HeaderLight12Component,
        Slider7Component,
        CallToAction6Component,
        OwlSlider9Component,
        Gallery1Component,
        Gallery2Component,
        ServicesElement8Component,
        Team8Component,
        Testimonial6Component,
        Blog3Component,
        Footer6Component
    ],
    templateUrl: './home-food-industry.component.html',
    styleUrl: './home-food-industry.component.css'
})
export class HomeFoodIndustryComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  blogs: any = [
    {
      blog_image: "assets/images/blog/latest-blog/pic1.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>demongo</a>",
      post_title: "Why You Should Not Go To Industry",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/blog/latest-blog/pic2.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>AARON</a>",
      post_title: "Seven Doubts You Should Clarify About",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/blog/latest-blog/pic3.jpg",
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
      section_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      team: [
        {
          name: "Nashid Martines",
          role: "Director",
          image: "assets/images/our-team/team-bx/pic1.jpg",
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
          role: "Director",
          image: "assets/images/our-team/team-bx/pic2.jpg",
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
          role: "Developer",
          image: "assets/images/our-team/team-bx/pic3.jpg",
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
          role: "Manager",
          image: "assets/images/our-team/team-bx/pic4.jpg",
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
          image: "assets/images/our-team/pic1.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/our-team/pic2.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/our-team/pic3.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        }
      ]
    }
  ];

}
