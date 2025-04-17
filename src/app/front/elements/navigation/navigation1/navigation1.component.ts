import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location, NgClass, NgIf, PlatformLocation } from '@angular/common';
import * as $ from 'jquery'; // Import jQuery
declare var jQuery: any; // Add this line
declare var handleResizeElement: any;

interface MenuType {
  title: string;
  menuClass?: string;
  subMenuClass?: string;
  subMenu?: {
    title: string;
    route?: string;
    img?: string;
    themeColor?: string;
    subSubMenu?: {
      title: string;
      route: string;
    }[]
  }[];
}

@Component({
    selector: 'app-navigation1',
    imports: [
        RouterLink,
        NgClass,
        NgIf,
    ],
    templateUrl: './navigation1.component.html',
    styleUrl: './navigation1.component.css'
})
export class Navigation1Component {
  cssUrl: any = '';
  toggleMenu: string = '';
  toggleSubMenu: string = '';
  currentHref: string = "";
  activeMenu: string = "";

  constructor(public router: Router, private backLocation: PlatformLocation, private location: Location) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentHref = location.path();
      } else {
        this.currentHref = '/index'
      }
    });
    backLocation.onPopState(() => {   // back click get url
      this.handleActiveMenu(window.location.pathname);
    });
    if (this.router.url == '/index') {
      this.themeColor('1');
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
        if (typeof jQuery !== 'undefined') {
            (function ($) {
                handleResizeElement();
            })(jQuery);
        } else {
            console.error('jQuery is not defined. Ensure it is loaded in your project.');
        }
    }, 1000);

    this.handleActiveMenu(this.currentHref);

    setTimeout(() => {
        if (typeof jQuery !== 'undefined') {
            jQuery('.some-class').someFunction(); // Example usage
        } else {
            console.error('jQuery is not defined');
        }
    }, 1000);
  }

  ngAfterViewInit() {
    if (typeof $ !== 'undefined') {
        setTimeout(() => {
            // Your jQuery-dependent code here
        }, 0);
    } else {
        console.error('jQuery is not defined. Ensure it is loaded in your project.');
    }
  }

  themeColor(itme: any) {
    this.cssUrl = document.getElementById("cssFileUrl");
    this.cssUrl.setAttribute('href', 'assets/css/skin/skin-' + itme + '.min.css');
  }

  opneMenu(item: any) {
    if (this.toggleMenu != item.toString()) {
      this.toggleMenu = item.toString();
    } else {
      this.toggleMenu = ' ';
    }
  }
  opneSubMenu(item: any) {
    if (this.toggleSubMenu != item.toString()) {
      this.toggleSubMenu = item.toString();
    } else {
      this.toggleSubMenu = ' ';
    }
  }

  handleActiveMenu(val: any) {
    this.sidebarMenu.map((data: any, ind: any) => {
      data.subMenu?.map((item: any, ind: any) => {
        if (item.route == val) {
          if (data.title == 'Home') {
            this.themeColor(item.themeColor);
          }
          this.activeMenu = data.title;
        }
        item.subSubMenu?.map((subTtme: any, ind: any) => {
          if (subTtme.route == val) {
            this.activeMenu = data.title;
          }
        })
      })
    })
  }

  sidebarMenu: MenuType[] = [
    {
      title: 'Home',
      menuClass: 'has-mega-menu homedemo',
      subMenuClass: 'mega-menu',
      subMenu: [
        {
          title: 'Home - Default',
          route: '/index',
          img: 'assets/demo/pic1.jpg',
          themeColor: '1'
        },
        {
          title: 'Home - Oil/Gas Plant',
          route: '/home-oil-plant',
          img: 'assets/demo/pic2.jpg',
          themeColor: '2'
        },
        {
          title: 'Home - Steel Plant',
          route: '/home-steel-plant',
          img: 'assets/demo/pic3.jpg',
          themeColor: '2'
        },
        {
          title: 'Home - Factory',
          route: '/home-factory',
          img: 'assets/demo/pic4.jpg',
          themeColor: '2'
        },
        {
          title: 'Home - Construct',
          route: '/home-construct',
          img: 'assets/demo/pic5.jpg',
          themeColor: '3'
        },
        {
          title: 'Home - Solar Plant',
          route: '/home-solar-plant',
          img: 'assets/demo/pic6.jpg',
          themeColor: '4'
        },
        {
          title: 'Home - Food Industry',
          route: '/home-food-industry',
          img: 'assets/demo/pic7.jpg',
          themeColor: '5'
        },
        {
          title: 'Home - Agriculture',
          route: '/home-agriculture',
          img: 'assets/demo/pic8.jpg',
          themeColor: '6'
        },
        {
          title: 'Home - Ship Industry',
          route: '/home-ship-industry',
          img: 'assets/demo/pic9.jpg',
          themeColor: '7'
        },
        {
          title: 'Home - Leather Industry',
          route: '/home-leather-industry',
          img: 'assets/demo/pic10.jpg',
          themeColor: '8'
        },
        {
          title: 'Home - Nuclear Plant',
          route: '/home-nuclear-plant',
          img: 'assets/demo/pic11.jpg',
          themeColor: '2'
        },
        {
          title: 'Home - Beer Factory',
          route: '/home-beer-factory',
          img: 'assets/demo/pic12.jpg',
          themeColor: '9'
        },
        {
          title: 'Home - Mining Industry',
          route: '/home-mining-industry',
          img: 'assets/demo/pic13.jpg',
          themeColor: '2'
        },
        {
          title: 'Home - Car Industry',
          route: '/home-car-industry',
          img: 'assets/demo/pic14.jpg',
          themeColor: '2'
        },
        {
          title: 'Home - Plastic Industry',
          route: '/home-plastic-industry',
          img: 'assets/demo/pic15.jpg',
          themeColor: '7'
        }
      ]
    },
    {
      title: 'Features',
      subMenuClass: 'sub-menu tab-content',
      subMenu: [
        {
          title: 'Header Light',
          subSubMenu: [
            {
              title: 'Header 1',
              route: '/header-style-1',
            },
            {
              title: 'Header 2',
              route: '/header-style-2',
            },
            {
              title: 'Header 3',
              route: '/header-style-3',
            },
            {
              title: 'Header 4',
              route: '/header-style-4',
            },
            {
              title: 'Header 5',
              route: '/header-style-5',
            },
            {
              title: 'Header 6',
              route: '/header-style-6',
            },
          ]
        },
        {
          title: 'Header Dark',
          subSubMenu: [
            {
              title: 'Header 1',
              route: '/header-style-dark-1',
            },
            {
              title: 'Header 2',
              route: '/header-style-dark-2',
            },
            {
              title: 'Header 3',
              route: '/header-style-dark-3',
            },
            {
              title: 'Header 4',
              route: '/header-style-dark-4',
            },
            {
              title: 'Header 5',
              route: '/header-style-dark-5',
            },
            {
              title: 'Header 6',
              route: '/header-style-dark-6',
            },
          ]
        },
        {
          title: 'Footer',
          subSubMenu: [
            {
              title: 'Footer 1',
              route: '/footer-1',
            },
            {
              title: 'Footer 2',
              route: '/footer-2',
            },
            {
              title: 'Footer 3',
              route: '/footer-3',
            },
            {
              title: 'Footer 4',
              route: '/footer-4',
            },
            {
              title: 'Footer 5',
              route: '/footer-5',
            },
            {
              title: 'Footer 6',
              route: '/footer-6',
            },
            {
              title: 'Footer 7',
              route: '/footer-7',
            },
            {
              title: 'Footer 8',
              route: '/footer-8',
            },
            {
              title: 'Footer 9',
              route: '/footer-9',
            },
            {
              title: 'Footer 10',
              route: '/footer-10',
            },
            {
              title: 'Footer 11',
              route: '/footer-11',
            },
            {
              title: 'Footer 12',
              route: '/footer-12',
            },
          ]
        }
      ]
    },
    {
      title: 'Pages',
      menuClass: 'has-mega-menu',
      subMenuClass: 'mega-menu',
      subMenu: [
        {
          title: 'Pages',
          subSubMenu: [
            {
              title: 'About us 1',
              route: '/about-1',
            },
            {
              title: 'About us 2',
              route: '/about-2',
            },
            {
              title: 'Services 1',
              route: '/services-1',
            },
            {
              title: 'Services 2',
              route: '/services-2',
            },
            {
              title: 'Services Details',
              route: '/services-details',
            }
          ]
        },
        {
          title: 'Pages',
          subSubMenu: [
            {
              title: 'Team 1',
              route: '/team-1',
            },
            {
              title: 'Team 2',
              route: '/team-2',
            },
            {
              title: 'Faqs 1',
              route: '/faq-1',
            },
            {
              title: 'Faqs 2',
              route: '/faq-2',
            }
          ]
        },
        {
          title: 'Pages',
          subSubMenu: [
            {
              title: 'Portfolio Grid 2',
              route: '/portfolio-grid-2',
            },
            {
              title: 'Portfolio Grid 3',
              route: '/portfolio-grid-3',
            },
            {
              title: 'Portfolio Grid 4',
              route: '/portfolio-grid-4',
            },
            {
              title: 'Portfolio Details',
              route: '/portfolio-details',
            },
            {
              title: 'Privacy Policy',
              route: '/privacy-policy',
            }
          ]
        },
        {
          title: 'Pages',
          subSubMenu: [
            {
              title: 'Error-403',
              route: '/error-403',
            },
            {
              title: 'Error-404',
              route: '/error-404',
            },
            {
              title: 'Error-405',
              route: '/error-405',
            },
            {
              title: 'Help Desk',
              route: '/help-desk',
            }
          ]
        }
      ]
    },
    {
      title: 'Shop',
      subMenuClass: 'sub-menu',
      subMenu: [
        {
          title: 'Shop',
          route: '/shop'
        },
        {
          title: 'Shop Sidebar',
          route: '/shop-sidebar',
        },
        {
          title: 'Product Details',
          route: '/shop-product-details',
        },
        {
          title: 'Cart',
          route: '/shop-cart',
        },
        {
          title: 'Wishlist',
          route: '/shop-wishlist',
        },
        {
          title: 'Checkout',
          route: '/shop-checkout',
        },
        {
          title: 'Login',
          route: '/shop-login',
        },
        {
          title: 'Register',
          route: '/shop-register',
        }
      ]
    },
    {
      title: 'Blog',
      menuClass: 'has-mega-menu',
      subMenuClass: 'mega-menu',
      subMenu: [
        {
          title: 'Blog',
          subSubMenu: [
            {
              title: 'Half image',
              route: '/blog-half-img',
            },
            {
              title: 'Half image sidebar',
              route: '/blog-half-img-sidebar',
            },
            {
              title: 'Half image sidebar left',
              route: '/blog-half-img-left-sidebar',
            },
            {
              title: 'Large image',
              route: '/blog-large-img',
            }
          ]
        },
        {
          title: 'Blog',
          subSubMenu: [
            {
              title: 'Large image sideba',
              route: '/blog-large-img-sidebar',
            },
            {
              title: 'Large image sidebar left',
              route: '/blog-large-img-left-sidebar',
            },
            {
              title: 'Grid 2',
              route: '/blog-grid-2',
            },
            {
              title: 'Grid 2 sidebar',
              route: '/blog-grid-2-sidebar',
            }
          ]
        },
        {
          title: 'Blog',
          subSubMenu: [
            {
              title: 'Grid 2 sidebar left',
              route: '/blog-grid-2-sidebar-left',
            },
            {
              title: 'Grid 3',
              route: '/blog-grid-3',
            },
            {
              title: 'Grid 3 sidebar',
              route: '/blog-grid-3-sidebar',
            },
            {
              title: 'Grid 3 sidebar left',
              route: '/blog-grid-3-sidebar-left',
            }
          ]
        },
        {
          title: 'Blog',
          subSubMenu: [
            {
              title: 'Grid 4',
              route: '/blog-grid-4',
            },
            {
              title: 'Single',
              route: '/blog-single',
            },
            {
              title: 'Single sidebar',
              route: '/blog-single-sidebar',
            },
            {
              title: 'Single sidebar right',
              route: '/blog-single-left-sidebar',
            }
          ]
        }
      ]
    },
    {
      title: 'Contact Us',
      subMenuClass: 'sub-menu right',
      subMenu: [
        {
          title: 'Contact us 1',
          route: '/contact-1',
        },
        {
          title: 'Contact us 2',
          route: '/contact-2',
        },
        {
          title: 'Contact us 3',
          route: '/contact-3',
        },
        {
          title: 'Contact us 4',
          route: '/contact-4',
        }
      ]
    }
  ]
}
