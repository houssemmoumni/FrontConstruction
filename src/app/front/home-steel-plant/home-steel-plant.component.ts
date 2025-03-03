import { Component } from '@angular/core';
import { HeaderLight8Component } from '../elements/header/header-light8/header-light8.component';
import { Slider3Component } from '../elements/rev-slider/slider3/slider3.component';
import { ServicesElement3Component } from '../elements/services/services-element3/services-element3.component';
import { Content1Component } from '../elements/content-box/content1/content1.component';
import { Content2Component } from '../elements/content-box/content2/content2.component';
import { CallToAction2Component } from '../elements/call-to-action/call-to-action2/call-to-action2.component';
import { OwlSlider2Component } from '../elements/sliders/owl-slider2/owl-slider2.component';
import { Team4Component } from '../elements/team/team4/team4.component';
import { Testimonial2Component } from '../elements/testimonial/testimonial2/testimonial2.component';
import { Blog2Component } from '../elements/blog/blog2/blog2.component';
import { CallToAction3Component } from '../elements/call-to-action/call-to-action3/call-to-action3.component';
import { Footer15Component } from '../elements/footer/footer15/footer15.component';

@Component({
    selector: 'app-home-steel-plant',
    imports: [
        HeaderLight8Component,
        Slider3Component,
        ServicesElement3Component,
        Content1Component,
        Content2Component,
        CallToAction2Component,
        OwlSlider2Component,
        Team4Component,
        Testimonial2Component,
        Blog2Component,
        CallToAction3Component,
        Footer15Component
    ],
    templateUrl: './home-steel-plant.component.html',
    styleUrl: './home-steel-plant.component.css'
})
export class HomeSteelPlantComponent {
  constructor() { }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  blogs: any = [
    {
      blog_image: "assets/images/blog/grid/pic1.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Jack</a>",
      post_title: "Seven Doubts You Should",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/blog/grid/pic2.jpg",
      post_date: "<strong>11 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Zachary</a>",
      post_title: "The Shocking Revelation",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/blog/grid/pic3.jpg",
      post_date: "<strong>12 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Charlotte</a>",
      post_title: "The Shocking Revelation",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
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
          role: "Director",
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
          name: "Hackson Willingham",
          role: "Developer",
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
          name: "Konne Backfield",
          role: "Manager",
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

  ngOnInit(): void {
  }
}
