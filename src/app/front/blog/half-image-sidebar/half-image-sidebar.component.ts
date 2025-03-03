import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { Newsletter1Component } from '../../elements/forms/newsletter1/newsletter1.component';
import { SearchForm2Component } from '../../elements/forms/search-form2/search-form2.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { CategoryList1Component } from '../../elements/widgets/category-list1/category-list1.component';
import { OurGallery1Component } from '../../elements/widgets/our-gallery1/our-gallery1.component';
import { RecentPosts1Component } from '../../elements/widgets/recent-posts1/recent-posts1.component';
import { TagList1Component } from '../../elements/widgets/tag-list1/tag-list1.component';

interface blogType {
  image: string,
  date: string,
  userName: string,
  title: string,
  decs: string,
}

@Component({
    selector: 'app-half-image-sidebar',
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
    templateUrl: './half-image-sidebar.component.html',
    styleUrl: './half-image-sidebar.component.css'
})
export class HalfImageSidebarComponent {

  banner: any = {
    pagetitle: "Blog half image with sidebar",
    bg_image: "assets/images/banner/bnr1.jpg",
    title: "Blog half image with sidebar",
  }
  layout: any = {
    sidebar: true,
    sidebarPosition: "right"
  }
  constructor() { }

  ngOnInit(): void {
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
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/grid/pic2.jpg',
      date: '16 Aug 2024',
      userName: 'Harry',
      title: 'How To Get People To Like Industry',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/grid/pic3.jpg',
      date: '16 Aug 2024',
      userName: 'Aaron',
      title: 'The Story Of Industry Has Just',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/grid/pic4.jpg',
      date: '15 Aug 2024',
      userName: 'Jamie',
      title: 'Seven Outrageous Ideas Industry',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/grid/pic1.jpg',
      date: '15 Aug 2024',
      userName: 'Oliver',
      title: 'Why Are Children So Obsessed',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/grid/pic2.jpg',
      date: '14 Aug 2024',
      userName: 'Winnie',
      title: 'How Industry Can Increase',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/grid/pic3.jpg',
      date: '11 Aug 2024',
      userName: 'Anna',
      title: "Here's What People Are Saying",
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
  ]
}
