import { Component } from '@angular/core';
import { Slider6Component } from '../elements/rev-slider/slider6/slider6.component';
import { HeaderLight11Component } from '../elements/header/header-light11/header-light11.component';
import { ServicesElement6Component } from '../elements/services/services-element6/services-element6.component';
import { CallToAction5Component } from '../elements/call-to-action/call-to-action5/call-to-action5.component';
import { OwlSlider7Component } from '../elements/sliders/owl-slider7/owl-slider7.component';
import { Team7Component } from '../elements/team/team7/team7.component';
import { ServicesElement7Component } from '../elements/services/services-element7/services-element7.component';
import { OwlSlider8Component } from '../elements/sliders/owl-slider8/owl-slider8.component';
import { Testimonial5Component } from '../elements/testimonial/testimonial5/testimonial5.component';
import { Blog4Component } from '../elements/blog/blog4/blog4.component';
import { Footer21Component } from '../elements/footer/footer21/footer21.component';

@Component({
    selector: 'app-home-solar-plant',
    imports: [
        Slider6Component,
        HeaderLight11Component,
        ServicesElement6Component,
        CallToAction5Component,
        OwlSlider7Component,
        Team7Component,
        ServicesElement7Component,
        OwlSlider8Component,
        Testimonial5Component,
        Blog4Component,
        Footer21Component
    ],
    templateUrl: './home-solar-plant.component.html',
    styleUrl: './home-solar-plant.component.css'
})
export class HomeSolarPlantComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  slideStore = [
    {
      section_title: "Our Services",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      services: [
        {
          image: 'assets/images/our-work/solarplant/pic1.jpg',
          title: 'Wind Turbines',
          decs: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.',
        },
        {
          image: 'assets/images/our-work/solarplant/pic2.jpg',
          title: 'Solar Panels',
          decs: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.',
        },
        {
          image: 'assets/images/our-work/solarplant/pic3.jpg',
          title: 'Maintenance',
          decs: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.',
        },
        {
          image: 'assets/images/our-work/solarplant/pic1.jpg',
          title: 'Wind Turbines',
          decs: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.',
        },
        {
          image: 'assets/images/our-work/solarplant/pic2.jpg',
          title: 'Solar Panels',
          decs: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.',
        },
        {
          image: 'assets/images/our-work/solarplant/pic3.jpg',
          title: 'Maintenance',
          decs: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the book.',
        }
      ]
    }
  ]

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
      section_title: "Our Crew Team",
      section_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      team: [
        {
          name: "Philip Demarco",
          role: "founder of agency",
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
              title: "youtube",
              icon_class: "fa-youtube-play",
              link: "https://www.youtube.com/channel/UCGL8V6uxNNMRrk3oZfVct1g",
            }
          ]
        },
        {
          name: "Angelina Johnson",
          role: "founder of agency",
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
              title: "youtube",
              icon_class: "fa-youtube-play",
              link: "https://www.youtube.com/channel/UCGL8V6uxNNMRrk3oZfVct1g",
            }
          ]
        },
        {
          name: "Philip Demarco",
          role: "founder of agency",
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
              title: "youtube",
              icon_class: "fa-youtube-play",
              link: "https://www.youtube.com/channel/UCGL8V6uxNNMRrk3oZfVct1g",
            }
          ]
        },
        {
          name: "Philip Demarco",
          role: "founder of agency",
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
              title: "youtube",
              icon_class: "fa-youtube-play",
              link: "https://www.youtube.com/channel/UCGL8V6uxNNMRrk3oZfVct1g",
            }
          ]
        },
      ]
    }
  ];

  testimonials = [
    {
      section_title: "Testimonials",
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
        }
      ]
    }
  ];

  ngOnInit(): void {
  }
}
