import { Component } from '@angular/core';
import { HeaderLight14Component } from '../elements/header/header-light14/header-light14.component';
import { SearchForm1Component } from '../elements/forms/search-form1/search-form1.component';
import { Content4Component } from '../elements/content-box/content4/content4.component';
import { OwlSlider12Component } from '../elements/sliders/owl-slider12/owl-slider12.component';
import { ServicesElement10Component } from '../elements/services/services-element10/services-element10.component';
import { Testimonial8Component } from '../elements/testimonial/testimonial8/testimonial8.component';
import { Team10Component } from '../elements/team/team10/team10.component';
import { CallToAction2Component } from '../elements/call-to-action/call-to-action2/call-to-action2.component';
import { Blog3Component } from '../elements/blog/blog3/blog3.component';
import { Footer10Component } from '../elements/footer/footer10/footer10.component';

@Component({
    selector: 'app-home-ship-industry',
    imports: [
        HeaderLight14Component,
        SearchForm1Component,
        Content4Component,
        OwlSlider12Component,
        ServicesElement10Component,
        Testimonial8Component,
        Team10Component,
        CallToAction2Component,
        Blog3Component,
        Footer10Component
    ],
    templateUrl: './home-ship-industry.component.html',
    styleUrl: './home-ship-industry.component.css'
})
export class HomeShipIndustryComponent {
  logo = 'assets/images/logo-white-7.png';
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  blogs: any = [
    {
      blog_image: "assets/images/blog/default/ship/thum1.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>demongo</a>",
      post_title: "Why You Should Not Go To Industry",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/blog/default/ship/thum2.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>AARON</a>",
      post_title: "Seven Doubts You Should Clarify About",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/blog/default/ship/thum3.jpg",
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
          name: "Nashid Martines",
          role: "Director",
          image: "assets/images/our-team/pic8.jpg",
          social_link: [
            {
              title: "facebook",
              icon_class: "fa-facebook fb-btn",
              link: "https://www.facebook.com/dexignzone",
            },
            {
              title: "twitter",
              icon_class: "fa-twitter tw-btn",
              link: "https://twitter.com/dexignzones",
            },
            {
              title: "linkedin",
              icon_class: "fa-linkedin link-btn",
              link: "https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title: "pinterest",
              icon_class: "fa-pinterest pin-btn",
              link: "https://www.pinterest.com/dexignzone/",
            }
          ]
        },
        {
          name: "Konne Backfield",
          role: "Director",
          image: "assets/images/our-team/pic5.jpg",
          social_link: [
            {
              title: "facebook",
              icon_class: "fa-facebook fb-btn",
              link: "https://www.facebook.com/dexignzone",
            },
            {
              title: "twitter",
              icon_class: "fa-twitter tw-btn",
              link: "https://twitter.com/dexignzones",
            },
            {
              title: "linkedin",
              icon_class: "fa-linkedin link-btn",
              link: "https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title: "pinterest",
              icon_class: "fa-pinterest pin-btn",
              link: "https://www.pinterest.com/dexignzone/",
            }
          ]
        },
        {
          name: "Hackson Willingham",
          role: "Developer",
          image: "assets/images/our-team/pic1.jpg",
          social_link: [
            {
              title: "facebook",
              icon_class: "fa-facebook fb-btn",
              link: "https://www.facebook.com/dexignzone",
            },
            {
              title: "twitter",
              icon_class: "fa-twitter tw-btn",
              link: "https://twitter.com/dexignzones",
            },
            {
              title: "linkedin",
              icon_class: "fa-linkedin link-btn",
              link: "https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title: "pinterest",
              icon_class: "fa-pinterest pin-btn",
              link: "https://www.pinterest.com/dexignzone/",
            }
          ]
        },
        {
          name: "Konne Backfield",
          role: "Manager",
          image: "assets/images/our-team/pic6.jpg",
          social_link: [
            {
              title: "facebook",
              icon_class: "fa-facebook fb-btn",
              link: "https://www.facebook.com/dexignzone",
            },
            {
              title: "twitter",
              icon_class: "fa-twitter tw-btn",
              link: "https://twitter.com/dexignzones",
            },
            {
              title: "linkedin",
              icon_class: "fa-linkedin link-btn",
              link: "https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title: "pinterest",
              icon_class: "fa-pinterest pin-btn",
              link: "https://www.pinterest.com/dexignzone/",
            }
          ]
        },
      ]
    }
  ];

  testimonials = [
    {
      section_title: "Clients Say About Us",
      section_description: "19+ years’ experience",
      testimonial: [
        {
          name: "Thomas",
          role: "warden of sty",
          image: "assets/images/our-team/team-bx/pic1.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          name: "Alexander",
          role: "Farmer",
          image: "assets/images/our-team/team-bx/pic2.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          name: "Oliver",
          role: "Farm Experts",
          image: "assets/images/our-team/team-bx/pic3.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
      ]
    }
  ];
}
