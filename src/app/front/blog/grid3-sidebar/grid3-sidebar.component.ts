import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-grid3-sidebar',
  standalone: true,
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
    TagList1Component,
    CommonModule,
  ],
  templateUrl: './grid3-sidebar.component.html',
  styleUrls: ['./grid3-sidebar.component.css']
})
export class Grid3SidebarComponent implements OnInit {

  blogList: Blog[] = [];
  banner = {
    pagetitle: 'Blog grid 3 with sidebar',
    bg_image: 'assets/images/banner/bnr1.jpg',
    title: 'Blog grid 3 with sidebar',
  };
  layout = {
    sidebar: true,
    sidebarPosition: 'right',
    gridClass: 'col-lg-4',
  };

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        console.log("Données reçues :", data);
        this.blogList = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des blogs :", err);
      }
    });
  }

  scroll_top() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

// ✅ Ajout de la fonction trackById pour optimiser *ngFor
trackById(index: number, blog: Blog): number {
  return blog.id;
}

}
