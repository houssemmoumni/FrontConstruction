import { Component } from '@angular/core';
import { HeaderLight16Component } from '../elements/header/header-light16/header-light16.component';
import { Slider9Component } from '../elements/rev-slider/slider9/slider9.component';
import { CallToAction2Component } from '../elements/call-to-action/call-to-action2/call-to-action2.component';
import { ServicesElement12Component } from '../elements/services/services-element12/services-element12.component';
import { Gallery6Component } from '../elements/gallery/gallery6/gallery6.component';
import { Content5Component } from '../elements/content-box/content5/content5.component';
import { Content6Component } from '../elements/content-box/content6/content6.component';
import { Team12Component } from '../elements/team/team12/team12.component';
import { Testimonial10Component } from '../elements/testimonial/testimonial10/testimonial10.component';
import { Blog3Component } from '../elements/blog/blog3/blog3.component';
import { Footer18Component } from '../elements/footer/footer18/footer18.component';

@Component({
    selector: 'app-home-nuclear-plant',
    imports: [
        HeaderLight16Component,
        Slider9Component,
        CallToAction2Component,
        ServicesElement12Component,
        Gallery6Component,
        Content5Component,
        Content6Component,
        Team12Component,
        Testimonial10Component,
        Blog3Component,
        Footer18Component
    ],
    templateUrl: './home-nuclear-plant.component.html',
    styleUrl: './home-nuclear-plant.component.css'
})
export class HomeNuclearPlantComponent {
  coutactBtnClass = 'site-button btnhover15 white align-self-center outline ms-auto radius-xl outline-2';

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  blogs: any = [
    {
      blog_image: "assets/images/our-work/nuclear/pic1.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>demongo</a>",
      post_title: "Why You Should Not Go To Industry",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/our-work/nuclear/pic2.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>AARON</a>",
      post_title: "Seven Doubts You Should Clarify About",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/our-work/nuclear/pic3.jpg",
      post_date: "<strong>12 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>VICTORIA</a>",
      post_title: "Seven Outrageous Ideas Industry",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
  ];

  our_team = [
    {
      section_title: "Meet Our Team",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",

      team: [
        {
          name: "Marco Datella",
          role: "Developer",
          image: "assets/images/our-team/pic1.jpg",
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
          name: "Jimmy Morris",
          role: "Director",
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
        {
          name: "Jimmy Morris",
          role: "Director",
          image: "assets/images/our-team/pic5.jpg",
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
          image: "assets/images/testimonials/pic1.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make [...]",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic2.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make [...]",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic3.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make [...]",
        },
      ]
    }
  ];
}
