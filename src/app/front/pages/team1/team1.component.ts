import { Component } from '@angular/core';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Team3Component } from '../../elements/team/team3/team3.component';
import { Client3Component } from '../../elements/clients/client3/client3.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-team1',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Team3Component,
        Client3Component,
        Footer13Component
    ],
    templateUrl: './team1.component.html',
    styleUrl: './team1.component.css'
})
export class Team1Component {

  banner: any = {
    pagetitle: "Team",
    bg_image: "assets/images/banner/bnr4.jpg",
    title: "Team",
  }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
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
      section_title: "Meet Our Team",
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
          image: "assets/images/our-team/pic3.jpg",
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
          name: "Nashid Martines",
          role: "Director",
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
        {
          name: "Konne Backfield",
          role: "Designer",
          image: "assets/images/our-team/pic6.jpg",
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
          image: "assets/images/our-team/pic7.jpg",
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
          image: "assets/images/our-team/pic8.jpg",
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
        }
      ]
    }
  ];

}
