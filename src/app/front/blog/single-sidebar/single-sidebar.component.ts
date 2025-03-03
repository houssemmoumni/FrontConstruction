import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { CommentForm1Component } from '../../elements/forms/comment-form1/comment-form1.component';
import { Comments1Component } from '../../elements/comments/comments1/comments1.component';
import { Newsletter1Component } from '../../elements/forms/newsletter1/newsletter1.component';
import { SearchForm2Component } from '../../elements/forms/search-form2/search-form2.component';
import { CategoryList1Component } from '../../elements/widgets/category-list1/category-list1.component';
import { OurGallery1Component } from '../../elements/widgets/our-gallery1/our-gallery1.component';
import { RecentPosts1Component } from '../../elements/widgets/recent-posts1/recent-posts1.component';
import { TagList1Component } from '../../elements/widgets/tag-list1/tag-list1.component';

@Component({
    selector: 'app-single-sidebar',
    imports: [
        NgIf,
        NgClass,
        RouterLink,
        HeaderLight3Component,
        Banner1Component,
        Footer13Component,
        Comments1Component,
        CommentForm1Component,
        SearchForm2Component,
        RecentPosts1Component,
        Newsletter1Component,
        OurGallery1Component,
        CategoryList1Component,
        TagList1Component
    ],
    templateUrl: './single-sidebar.component.html',
    styleUrl: './single-sidebar.component.css'
})
export class SingleSidebarComponent {
  banner: any = {
    pagetitle: "Blog single with sidebar",
    bg_image: "assets/images/banner/bnr1.jpg",
    title: "Blog single with sidebar",
  }

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  layout: any = {
    sidebar: true,
    sidebarPosition: "right",
    container_class: ""
  }
}
