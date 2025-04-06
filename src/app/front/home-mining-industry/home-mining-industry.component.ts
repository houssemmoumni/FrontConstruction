import { Component } from '@angular/core';
import { HeaderLight18Component } from '../elements/header/header-light18/header-light18.component';
import { Slider11Component } from '../elements/rev-slider/slider11/slider11.component';
import { ServicesElement15Component } from '../elements/services/services-element15/services-element15.component';
import { ServicesElement16Component } from '../elements/services/services-element16/services-element16.component';
import { Content8Component } from '../elements/content-box/content8/content8.component';
import { Team5Component } from '../elements/team/team5/team5.component';
import { Counter2Component } from '../elements/counter/counter2/counter2.component';
import { Testimonial3Component } from '../elements/testimonial/testimonial3/testimonial3.component';
import { Blog5Component } from '../elements/blog/blog5/blog5.component';
import { CallToAction6Component } from '../elements/call-to-action/call-to-action6/call-to-action6.component';
import { Footer15Component } from '../elements/footer/footer15/footer15.component';

@Component({
    selector: 'app-home-mining-industry',
    imports: [
        HeaderLight18Component,
        Slider11Component,
        ServicesElement15Component,
        ServicesElement16Component,
        Content8Component,
        Team5Component,
        Counter2Component,
        Testimonial3Component,
        Blog5Component,
        CallToAction6Component,
        Footer15Component
    ],
    templateUrl: './home-mining-industry.component.html',
    styleUrl: './home-mining-industry.component.css'
})
export class HomeMiningIndustryComponent {
  callActionBtnClass = "site-button btnhover13 white align-self-center outline ms-auto outline-2";
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  blogs : any = [
		{
			blog_image: "assets/images/our-work/mining/pic1.jpg",
			post_date: "<strong>10 Aug</strong> <span> 2024</span>",
			post_author: "By <a href='javascript:void(0);'>Jack</a>",
			post_title: "Seven Doubts You Should",
      post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
			read_more_text: "READ MORE",
			read_more_link: "/blog-single",
		},
    {
			blog_image: "assets/images/our-work/mining/pic2.jpg",
			post_date: "<strong>11 Aug</strong> <span> 2024</span>",
			post_author: "By <a href='javascript:void(0);'>Zachary</a>",
			post_title: "The Shocking Revelation",
			post_description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.",
			read_more_text: "READ MORE",
			read_more_link: "/blog-single",
		},
    {
			blog_image: "assets/images/our-work/mining/pic3.jpg",
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
      section_title: "Our Team",
      section_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",

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
  ]

  testimonials = [
    {
      section_title: "Testimonials",
      section_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
      testimonial: [
        {
          name: "David Matin",
          role: "Student",
          image: "assets/images/our-team/pic3.jpg",
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
          image: "assets/images/our-team/pic1.jpg",
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
        },
      ]
    }
  ];
}
