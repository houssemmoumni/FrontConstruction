import { Component } from '@angular/core';
import { HeaderLight3Component } from '../elements/header/header-light3/header-light3.component';
import { Footer14Component } from '../elements/footer/footer14/footer14.component';
import { Slider1Component } from '../elements/rev-slider/slider1/slider1.component';
import { OwlSlider1Component } from '../elements/sliders/owl-slider1/owl-slider1.component';
import { CallToAction1Component } from '../elements/call-to-action/call-to-action1/call-to-action1.component';
import { ServicesElement1Component } from '../elements/services/services-element1/services-element1.component';
import { Counter1Component } from '../elements/counter/counter1/counter1.component';
import { Team3Component } from '../elements/team/team3/team3.component';
import { Testimonial1Component } from '../elements/testimonial/testimonial1/testimonial1.component';
import { Blog1Component } from '../elements/blog/blog1/blog1.component';
import { Client1Component } from '../elements/clients/client1/client1.component';
import { ServicesElement7Component } from '../elements/services/services-element7/services-element7.component';

@Component({
    selector: 'app-index',
    imports: [
        HeaderLight3Component,
        Footer14Component,
        Slider1Component,
        OwlSlider1Component,
        CallToAction1Component,
        ServicesElement1Component,
        Counter1Component,
        Team3Component,
        Testimonial1Component,
        ServicesElement7Component,
        Blog1Component,
        Client1Component
    ],
    templateUrl: './index.component.html',
    styleUrl: './index.component.css'
})
export class IndexComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  slideStore = [
    {
      section_title: `Why Customer Love To  <br><span class="text-primary">Choose Us</span>`,
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      services: [
        {
          title: "Agricultural Processing",
          decs: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
          image: "assets/images/our-services/pic3.jpg",
        },
        {
          title: "Material Engineering",
          decs: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
          image: "assets/images/our-services/pic2.jpg",
        },
        {
          title: "Petroleum Engineering",
          decs: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
          image: "assets/images/our-services/pic1.jpg",
        },
        {
          title: "Agricultural Processing",
          decs: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
          image: "assets/images/our-services/pic3.jpg",
        },
        {
          title: "Material Engineering",
          decs: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.",
          image: "assets/images/our-services/pic2.jpg",
        }
      ]
    }
  ]

  our_team = [
    {
      section_title: "Meet The Team",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
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
      section_title: "What People Are Saying",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      testimonial: [
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic3.jpg",
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
          image: "assets/images/testimonials/pic1.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic3.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
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

  clients = [
    {
      logo_image: "assets/images/client-logo/logo1.jpg",
      logo_url: "javascript:void(0);",
    },
    {
      logo_image: "assets/images/client-logo/logo2.jpg",
      logo_url: "javascript:void(0);",
    },
    {
      logo_image: "assets/images/client-logo/logo1.jpg",
      logo_url: "javascript:void(0);",
    },
    {
      logo_image: "assets/images/client-logo/logo3.jpg",
      logo_url: "javascript:void(0);",
    },
    {
      logo_image: "assets/images/client-logo/logo4.jpg",
      logo_url: "javascript:void(0);",
    },
    {
      logo_image: "assets/images/client-logo/logo3.jpg",
      logo_url: "javascript:void(0);",
    },
  ];
}
