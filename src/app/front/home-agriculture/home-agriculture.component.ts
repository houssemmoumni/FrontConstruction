import { Component } from '@angular/core';
import { HeaderLight13Component } from '../elements/header/header-light13/header-light13.component';
import { OwlSlider10Component } from '../elements/sliders/owl-slider10/owl-slider10.component';
import { CallToAction7Component } from '../elements/call-to-action/call-to-action7/call-to-action7.component';
import { OwlSlider11Component } from '../elements/sliders/owl-slider11/owl-slider11.component';
import { ServicesElement9Component } from '../elements/services/services-element9/services-element9.component';
import { Team9Component } from '../elements/team/team9/team9.component';
import { Gallery3Component } from '../elements/gallery/gallery3/gallery3.component';
import { Gallery4Component } from '../elements/gallery/gallery4/gallery4.component';
import { Testimonial7Component } from '../elements/testimonial/testimonial7/testimonial7.component';
import { Footer17Component } from '../elements/footer/footer17/footer17.component';

@Component({
    selector: 'app-home-agriculture',
    imports: [
        HeaderLight13Component,
        OwlSlider10Component,
        CallToAction7Component,
        OwlSlider11Component,
        ServicesElement9Component,
        Team9Component,
        Gallery3Component,
        Gallery4Component,
        Testimonial7Component,
        Footer17Component
    ],
    templateUrl: './home-agriculture.component.html',
    styleUrl: './home-agriculture.component.css'
})
export class HomeAgricultureComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  videoGallery = [
    {
      section_title: "Video Gallery",
      viewAllLink: "javascript:void(0);",
      type: "video",
      items: [
        {
          url: "https://www.youtube.com/watch?v=_FRZVScwggM",
          image: "assets/images/gallery/agriculture/pic1.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=_FRZVScwggM",
          image: "assets/images/gallery/agriculture/pic2.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=_FRZVScwggM",
          image: "assets/images/gallery/agriculture/pic3.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=_FRZVScwggM",
          image: "assets/images/gallery/agriculture/pic4.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=_FRZVScwggM",
          image: "assets/images/gallery/agriculture/pic5.jpg",
        },
        {
          url: "https://www.youtube.com/watch?v=_FRZVScwggM",
          image: "assets/images/gallery/agriculture/pic6.jpg",
        }
      ]
    }
  ];

  imageGallery = [
    {
      section_title: "Image Gallery",
      viewAllLink: "javascript:void(0);",
      type: "image",
      items: [
        {
          original_image: "assets/images/gallery/pic1.jpg",
          image: "assets/images/gallery/agriculture/pic1.jpg",
        },
        {
          original_image: "assets/images/gallery/pic2.jpg",
          image: "assets/images/gallery/agriculture/pic2.jpg",
        },
        {
          original_image: "assets/images/gallery/pic3.jpg",
          image: "assets/images/gallery/agriculture/pic3.jpg",
        },
        {
          original_image: "assets/images/gallery/pic4.jpg",
          image: "assets/images/gallery/agriculture/pic4.jpg",
        },
        {
          original_image: "assets/images/gallery/pic5.jpg",
          image: "assets/images/gallery/agriculture/pic5.jpg",
        },
        {
          original_image: "assets/images/gallery/pic6.jpg",
          image: "assets/images/gallery/agriculture/pic6.jpg",
        },

      ]
    }
  ];

  our_team = [
    {
      section_title: "Our Team",
      section_description: "",
      team: [
        {
          name: "Oliver",
          role: "Farm Experts",
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
          name: "Alexander",
          role: "Farmer",
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
          name: "Charles",
          role: "milkmaster",
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
          name: "Thomas",
          role: "warden of sty",
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
        {
          name: "Oliver",
          role: "Farm Experts",
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
          name: "Alexander",
          role: "Farmer",
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
          name: "Charles",
          role: "milkmaster",
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
          name: "Thomas",
          role: "warden of sty",
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
      section_title: "Client Testimonial",
      section_description: "",
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
        }
      ]
    }
  ];
}
