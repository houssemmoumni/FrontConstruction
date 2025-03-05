import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

interface blogType {
  image: string,
  date: string,
  userName: string,
  title: string,
  decs: string,
}
@Component({
    selector: 'app-large-image',
    imports: [
        NgClass,
        RouterLink,
        HeaderLight3Component,
        Banner1Component,
        Footer13Component,
    ],
    templateUrl: './large-image.component.html',
    styleUrl: './large-image.component.css'
})
export class LargeImageComponent {
  banner: any = {
    pagetitle: "Blog large image",
    bg_image: "assets/images/banner/bnr1.jpg",
    title: "Blog large image",
  }
  layout: any = {
    sidebar: false,
    sidebarPosition: ""
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
      image: 'assets/images/blog/default/thum1.jpg',
      date: '17 Aug 2024',
      userName: 'Oliver',
      title: 'Why Are Children So Obsessed',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/default/thum2.jpg',
      date: '16 Aug 2024',
      userName: 'Harry',
      title: 'How To Get People To Like Industry',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/default/thum3.jpg',
      date: '16 Aug 2024',
      userName: 'Aaron',
      title: 'The Story Of Industry Has Just',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
    {
      image: 'assets/images/blog/default/thum4.jpg',
      date: '15 Aug 2024',
      userName: 'Jamie',
      title: 'Seven Outrageous Ideas Industry',
      decs: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    }
  ]
}


