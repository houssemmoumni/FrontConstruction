import { Component } from '@angular/core';
import { HeaderLight17Component } from '../elements/header/header-light17/header-light17.component';
import { Slider10Component } from '../elements/rev-slider/slider10/slider10.component';
import { Content7Component } from '../elements/content-box/content7/content7.component';
import { ServicesElement13Component } from '../elements/services/services-element13/services-element13.component';
import { ServicesElement14Component } from '../elements/services/services-element14/services-element14.component';
import { Team13Component } from '../elements/team/team13/team13.component';
import { Blog5Component } from '../elements/blog/blog5/blog5.component';
import { Testimonial11Component } from '../elements/testimonial/testimonial11/testimonial11.component';
import { Footer9Component } from '../elements/footer/footer9/footer9.component';

@Component({
    selector: 'app-home-beer-factory',
    imports: [
        HeaderLight17Component,
        Slider10Component,
        Content7Component,
        ServicesElement13Component,
        ServicesElement14Component,
        Team13Component,
        Blog5Component,
        Testimonial11Component,
        Footer9Component
    ],
    templateUrl: './home-beer-factory.component.html',
    styleUrl: './home-beer-factory.component.css'
})
export class HomeBeerFactoryComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  blogs: any = [
    {
      blog_image: "assets/images/our-work/beer/pic1.jpg",
      post_date: "<strong>10 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Jack</a>",
      post_title: "Seven Doubts You Should",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/our-work/beer/pic2.jpg",
      post_date: "<strong>11 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Zachary</a>",
      post_title: "Seven Doubts You Should",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
    {
      blog_image: "assets/images/our-work/beer/pic3.jpg",
      post_date: "<strong>12 Aug</strong> <span> 2024</span>",
      post_author: "By <a href='javascript:void(0);'>Charlotte</a>",
      post_title: "Seven Doubts You Should",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
      read_more_text: "READ MORE",
      read_more_link: "/blog-single",
    },
  ];

  story: any = {
    pagetitle: "OUR STORY",
    heading: 'Running a <br/>successful business <br/><span class="text-primary">since 1955</span>',
    sub_title: 'Industrial engineering is a branch of engineering which deals with the optimization.',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting Factory. Lorem Ipsum has been the Factory\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting Factory.',
    link_text: "About Us",
    url: 'about-2',
    image_url: 'assets/images/about/pic13.jpg'
  }

  our_team = [
    {
      section_title: "Our Team",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",

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
      section_title: "Our Client",
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      testimonial: [
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic4.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic6.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic5.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        }, {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic4.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic6.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic5.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        }, {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic4.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic6.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic5.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.",
        },
      ]
    }
  ];

}
