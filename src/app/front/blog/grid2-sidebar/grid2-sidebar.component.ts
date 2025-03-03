import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Newsletter1Component } from '../../elements/forms/newsletter1/newsletter1.component';
import { SearchForm2Component } from '../../elements/forms/search-form2/search-form2.component';
import { CategoryList1Component } from '../../elements/widgets/category-list1/category-list1.component';
import { OurGallery1Component } from '../../elements/widgets/our-gallery1/our-gallery1.component';
import { RecentPosts1Component } from '../../elements/widgets/recent-posts1/recent-posts1.component';
import { TagList1Component } from '../../elements/widgets/tag-list1/tag-list1.component';

declare  var jQuery:  any;
interface blogType {
  image: string,
  date: string,
  userName: string,
  title: string,
  decs: string,
}

@Component({
    selector: 'app-grid2-sidebar',
    imports: [
        NgIf,
        NgClass,
        RouterLink,
        HeaderLight3Component,
        Banner1Component,
        Footer13Component,
        SearchForm2Component,
        RecentPosts1Component,
        Newsletter1Component,
        OurGallery1Component,
        CategoryList1Component,
        TagList1Component
    ],
    templateUrl: './grid2-sidebar.component.html',
    styleUrl: './grid2-sidebar.component.css'
})
export class Grid2SidebarComponent {

  banner: any = {
    pagetitle: "Blog large image with sidebar",
    bg_image: "assets/images/banner/bnr1.jpg",
    title: "Blog large image with sidebar",
  }
  layout: any = {
    sidebar: true,
    sidebarPosition: "right",
    gridClass: "col-lg-6"
  }
  constructor() { }

  ngOnInit(): void {
    (function ($) {
      var self = jQuery("#masonry, .masonry");
      self.imagesLoaded(function () {
        self.masonry({
          gutterWidth: 15,
          isAnimated: true,
          itemSelector: ".card-container"
        });
      });

    })(jQuery);
  }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  blogList: blogType[] = [
    {
      image: 'assets/images/blog/grid/pic1.jpg',
      date: '17 Aug 2024',
      userName: 'Oliver',
      title: 'Why Are Children So Obsessed',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard.`,
    },
    {
      image: 'assets/images/blog/grid/pic2.jpg',
      date: '16 Aug 2024',
      userName: 'Harry',
      title: 'The Shocking Revelation',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard.`,
    },
    {
      image: 'assets/images/blog/grid/pic3.jpg',
      date: '16 Aug 2024',
      userName: 'Aaron',
      title: 'The Story Of Industry Has Just',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard.`,
    },
    {
      image: 'assets/images/blog/grid/pic4.jpg',
      date: '15 Aug 2024',
      userName: 'Jamie',
      title: 'Seven Outrageous Ideas Industry',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard.`,
    },
    {
      image: 'assets/images/blog/grid/pic1.jpg',
      date: '17 Aug 2024',
      userName: 'Oliver',
      title: 'Why Are Children So Obsessed',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard.`,
    },
    {
      image: 'assets/images/blog/grid/pic2.jpg',
      date: '16 Aug 2024',
      userName: 'Harry',
      title: 'The Shocking Revelation',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard.`,
    },
  ]

}
