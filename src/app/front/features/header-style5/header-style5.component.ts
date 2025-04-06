import { Component } from '@angular/core';
import { HeaderLight5Component } from '../../elements/header/header-light5/header-light5.component';
import { Banner2Component } from '../../elements/banner/banner2/banner2.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-header-style5',
    imports: [
        HeaderLight5Component,
        Banner2Component,
        Footer13Component
    ],
    templateUrl: './header-style5.component.html',
    styleUrl: './header-style5.component.css'
})
export class HeaderStyle5Component {
  banner : any = {
		pagetitle: "Header Style Transparent Topbar",
		bg_image: "assets/images/banner/bnr2.jpg",
		title: "Header Style Transparent Topbar",
	}
  constructor() { }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  ngOnInit(): void {
  }
}
