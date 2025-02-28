import { Component } from '@angular/core';
import { HeaderLight9Component } from '../elements/header/header-light9/header-light9.component';
import { Slider4Component } from '../elements/rev-slider/slider4/slider4.component';
import { OwlSlider3Component } from '../elements/sliders/owl-slider3/owl-slider3.component';
import { OwlSlider4Component } from '../elements/sliders/owl-slider4/owl-slider4.component';
import { CallToAction4Component } from '../elements/call-to-action/call-to-action4/call-to-action4.component';
import { ServicesElement4Component } from '../elements/services/services-element4/services-element4.component';
import { Team5Component } from '../elements/team/team5/team5.component';
import { Testimonial3Component } from '../elements/testimonial/testimonial3/testimonial3.component';
import { Blog4Component } from '../elements/blog/blog4/blog4.component';
import { Client2Component } from '../elements/clients/client2/client2.component';
import { Footer16Component } from '../elements/footer/footer16/footer16.component';

@Component({
    selector: 'app-home-factory',
    imports: [
        HeaderLight9Component,
        Slider4Component,
        OwlSlider3Component,
        OwlSlider4Component,
        CallToAction4Component,
        ServicesElement4Component,
        Team5Component,
        Testimonial3Component,
        Blog4Component,
        Client2Component,
        Footer16Component,
    ],
    templateUrl: './home-factory.component.html',
    styleUrl: './home-factory.component.css'
})
export class HomeFactoryComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  constructor() { }

  blogs : any = [
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

  our_team = [
    {
      section_title: "Meet The Team",
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
  ];

  testimonials = [
    {
      section_title: "Testimonials",
      section_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.",
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
        },
      ]
    }
  ];
  ngOnInit(): void {
  }

}
