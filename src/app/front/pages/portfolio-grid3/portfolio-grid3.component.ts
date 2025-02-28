import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Content17Component } from '../../elements/content-box/content17/content17.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-portfolio-grid3',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Content17Component,
        Footer13Component
    ],
    templateUrl: './portfolio-grid3.component.html',
    styleUrl: './portfolio-grid3.component.css'
})
export class PortfolioGrid3Component {
  banner: any = {
    pagetitle: "Portfolio Grid 3 Icon",
    bg_image: "assets/images/banner/bnr4.jpg",
    title: "Portfolio Grid 3 Icon",
  }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  portolio_grid = [
    {
      class_name: "col-lg-4",
      grids: [
        {
          title: "Muchen Railway Station",
          category: "System",
          grid_class: "web design",
          image: "assets/images/portfolio/image_1.jpg",
          img_src: "assets/images/portfolio/image_1.jpg",
          img_thumb: "assets/images/portfolio/image_1.jpg",
        },
        {
          title: "Mining Plant Set Up",
          category: "Mining / Plants",
          grid_class: "advertising branding photography",
          image: "assets/images/portfolio/image_2.jpg",
          img_src: "assets/images/portfolio/image_2.jpg",
          img_thumb: "assets/images/portfolio/image_2.jpg",
        },
        {
          title: "sanfran cisco bridge",
          category: "Engineering",
          grid_class: "branding design photography",
          image: "assets/images/portfolio/image_3.jpg",
          img_src: "assets/images/portfolio/image_3.jpg",
          img_thumb: "assets/images/portfolio/image_3.jpg",
        },
        {
          title: "hamburg wind energy",
          category: "Energy",
          grid_class: "web design",
          image: "assets/images/portfolio/image_4.jpg",
          img_src: "assets/images/portfolio/image_4.jpg",
          img_thumb: "assets/images/portfolio/image_4.jpg",
        },
        {
          title: "Capturing Manila",
          category: "industry",
          grid_class: "web branding",
          image: "assets/images/portfolio/image_5.jpg",
          img_src: "assets/images/portfolio/image_5.jpg",
          img_thumb: "assets/images/portfolio/image_5.jpg",
        },
        {
          title: "berlin central bank",
          category: "Bank / Constructions",
          grid_class: "advertising design photography",
          image: "assets/images/portfolio/image_6.jpg",
          img_src: "assets/images/portfolio/image_6.jpg",
          img_thumb: "assets/images/portfolio/image_6.jpg",
        },
        {
          title: "Crop Identity",
          category: "Branding and Identity",
          grid_class: "web branding",
          image: "assets/images/portfolio/image_7.jpg",
          img_src: "assets/images/portfolio/image_7.jpg",
          img_thumb: "assets/images/portfolio/image_7.jpg",
        },
        {
          title: "hamburg wind energy",
          category: "industry",
          grid_class: "advertising design photography",
          image: "assets/images/portfolio/image_8.jpg",
          img_src: "assets/images/portfolio/image_8.jpg",
          img_thumb: "assets/images/portfolio/image_8.jpg",
        },
        {
          title: "Capturing Manila",
          category: "industry",
          grid_class: "web photography",
          image: "assets/images/portfolio/image_9.jpg",
          img_src: "assets/images/portfolio/image_9.jpg",
          img_thumb: "assets/images/portfolio/image_9.jpg",
        },
        {
          title: "berlin central bank",
          category: "Bank / Constructions",
          grid_class: "advertising branding",
          image: "assets/images/portfolio/image_10.jpg",
          img_src: "assets/images/portfolio/image_10.jpg",
          img_thumb: "assets/images/portfolio/image_10.jpg",
        },
        {
          title: "sanfran cisco bridge",
          category: "Engineering",
          grid_class: "web design",
          image: "assets/images/portfolio/image_11.jpg",
          img_src: "assets/images/portfolio/image_11.jpg",
          img_thumb: "assets/images/portfolio/image_11.jpg",
        },
        {
          title: "Muchen Railway Station",
          category: "System",
          grid_class: "advertising branding photography",
          image: "assets/images/portfolio/image_12.jpg",
          img_src: "assets/images/portfolio/image_12.jpg",
          img_thumb: "assets/images/portfolio/image_12.jpg",
        },
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
