import { Component } from '@angular/core';
import { HeaderLight6Component } from '../../elements/header/header-light6/header-light6.component';
import { Banner2Component } from '../../elements/banner/banner2/banner2.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-header-style6',
    imports: [
        HeaderLight6Component,
        Banner2Component,
        Footer13Component
    ],
    templateUrl: './header-style6.component.html',
    styleUrl: './header-style6.component.css'
})
export class HeaderStyle6Component {
	banner : any = {
		pagetitle: "Header Style Transparent Topbar",
		bg_image: "assets/images/banner/bnr2.jpg",
		title: "Header Style Transparent Topbar",
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
}
