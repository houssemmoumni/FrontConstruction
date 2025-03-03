import { Component } from '@angular/core';
import { HeaderLight10Component } from '../elements/header/header-light10/header-light10.component';
import { Slider5Component } from '../elements/rev-slider/slider5/slider5.component';
import { Content3Component } from '../elements/content-box/content3/content3.component';
import { OwlSlider5Component } from '../elements/sliders/owl-slider5/owl-slider5.component';
import { OwlSlider6Component } from '../elements/sliders/owl-slider6/owl-slider6.component';
import { ServicesElement5Component } from '../elements/services/services-element5/services-element5.component';
import { Team6Component } from '../elements/team/team6/team6.component';
import { Testimonial4Component } from '../elements/testimonial/testimonial4/testimonial4.component';
import { Blog3Component } from '../elements/blog/blog3/blog3.component';
import { Footer16Component } from '../elements/footer/footer16/footer16.component';
import { Projects1Component } from '../elements/projects/projects1/projects1.component';

@Component({
    selector: 'app-home-construct',
    imports: [
        HeaderLight10Component,
        Slider5Component,
        Content3Component,
        OwlSlider5Component,
        Projects1Component,
        OwlSlider6Component,
        ServicesElement5Component,
        Team6Component,
        Testimonial4Component,
        Blog3Component,
        Footer16Component
    ],
    templateUrl: './home-construct.component.html',
    styleUrl: './home-construct.component.css'
})
export class HomeConstructComponent {
  constructor() { }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  blogs : any = [
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
      section_description: "There are many variations of passages of Lorem Ipsum typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      team: [
        {
          name: "Nashid Martines",
          role: "Director",
          image: "assets/images/our-team/pic1.jpg",
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
          image: "assets/images/our-team/pic2.jpg",
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
          image: "assets/images/our-team/pic4.jpg",
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
          image: "assets/images/our-team/pic5.jpg",
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
      section_title: "Clients Say About Us",
      section_description: "19+ years’ experience",
      testimonial: [
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/our-team/pic12.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/our-team/pic13.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/our-team/pic14.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
      ]
    }
  ];

  ngOnInit(): void {
  }
}
