import { Component } from '@angular/core';
import { HeaderLight20Component } from '../elements/header/header-light20/header-light20.component';
import { Slider13Component } from '../elements/rev-slider/slider13/slider13.component';
import { ServicesElement18Component } from '../elements/services/services-element18/services-element18.component';
import { Content10Component } from '../elements/content-box/content10/content10.component';
import { CallToAction8Component } from '../elements/call-to-action/call-to-action8/call-to-action8.component';
import { OwlSlider14Component } from '../elements/sliders/owl-slider14/owl-slider14.component';
import { Team16Component } from '../elements/team/team16/team16.component';
import { Testimonial14Component } from '../elements/testimonial/testimonial14/testimonial14.component';
import { Blog6Component } from '../elements/blog/blog6/blog6.component';
import { Footer15Component } from '../elements/footer/footer15/footer15.component';

@Component({
    selector: 'app-home-plastic-industry',
    imports: [
        HeaderLight20Component,
        Slider13Component,
        ServicesElement18Component,
        Content10Component,
        CallToAction8Component,
        OwlSlider14Component,
        Team16Component,
        Testimonial14Component,
        Blog6Component,
        Footer15Component
    ],
    templateUrl: './home-plastic-industry.component.html',
    styleUrl: './home-plastic-industry.component.css'
})
export class HomePlasticIndustryComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  blogs : any = [
		{
			blog_image: "assets/images/our-work/plastic/pic1.jpg",
			post_date: "<strong>10 Aug</strong> <span> 2024</span>",
			post_author: "By <a href='javascript:void(0);'>demongo</a>",
			post_title: "Why You Should Not Go To Industry",
			read_more_text: "READ MORE",
			read_more_link: "/blog-single",
		},
    {
			blog_image: "assets/images/our-work/plastic/pic2.jpg",
			post_date: "<strong>10 Aug</strong> <span> 2024</span>",
			post_author: "By <a href='javascript:void(0);'>AARON</a>",
			post_title: "Seven Doubts You Should Clarify About",
			read_more_text: "READ MORE",
			read_more_link: "/blog-single",
		},
    {
			blog_image: "assets/images/our-work/plastic/pic3.jpg",
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
          image: "assets/images/our-team/pic12.jpg",
          social_link: [
            {
              title:"facebook",
              icon_class:"fa-facebook",
              link:"https://www.facebook.com/dexignzone",
            },
            {
              title:"twitter",
              icon_class:"fa-twitter",
              link:"https://twitter.com/dexignzones",
            },
            {
              title:"linkedin",
              icon_class:"fa-linkedin",
              link:"https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title:"pinterest",
              icon_class:"fa-pinterest",
              link:"https://www.pinterest.com/dexignzone/",
            }
          ]
        },
        {
          name: "Konne Backfield",
          role: "Director",
          image: "assets/images/our-team/pic16.jpg",
          social_link: [
            {
              title:"facebook",
              icon_class:"fa-facebook",
              link:"https://www.facebook.com/dexignzone",
            },
            {
              title:"twitter",
              icon_class:"fa-twitter",
              link:"https://twitter.com/dexignzones",
            },
            {
              title:"linkedin",
              icon_class:"fa-linkedin",
              link:"https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title:"pinterest",
              icon_class:"fa-pinterest",
              link:"https://www.pinterest.com/dexignzone/",
            }
          ]
        },
        {
          name: "Hackson Willingham",
          role: "Developer",
          image: "assets/images/our-team/pic13.jpg",
          social_link: [
            {
              title:"facebook",
              icon_class:"fa-facebook",
              link:"https://www.facebook.com/dexignzone",
            },
            {
              title:"twitter",
              icon_class:"fa-twitter",
              link:"https://twitter.com/dexignzones",
            },
            {
              title:"linkedin",
              icon_class:"fa-linkedin",
              link:"https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title:"pinterest",
              icon_class:"fa-pinterest",
              link:"https://www.pinterest.com/dexignzone/",
            }
          ]
        },
        {
          name: "Konne Backfield",
          role: "Manager",
          image: "assets/images/our-team/pic15.jpg",
          social_link: [
            {
              title:"facebook",
              icon_class:"fa-facebook",
              link:"https://www.facebook.com/dexignzone",
            },
            {
              title:"twitter",
              icon_class:"fa-twitter",
              link:"https://twitter.com/dexignzones",
            },
            {
              title:"linkedin",
              icon_class:"fa-linkedin",
              link:"https://www.linkedin.com/showcase/dexignzone",
            },
            {
              title:"pinterest",
              icon_class:"fa-pinterest",
              link:"https://www.pinterest.com/dexignzone/",
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
          image: "assets/images/testimonials/pic6.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic5.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/testimonials/pic4.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled.",
        },
      ]
    }
  ];
}
