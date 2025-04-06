import { Component } from '@angular/core';
import { HeaderDark6Component } from '../../elements/header/header-dark6/header-dark6.component';
import { Banner2Component } from '../../elements/banner/banner2/banner2.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-header-style-dark6',
    imports: [
        HeaderDark6Component,
        Banner2Component,
        Footer13Component
    ],
    templateUrl: './header-style-dark6.component.html',
    styleUrl: './header-style-dark6.component.css'
})
export class HeaderStyleDark6Component {

	banner : any = {
		pagetitle: "Header Style Overlay Topbar",
		bg_image: "assets/images/banner/bnr2.jpg",
		title: "Header Style Overlay Topbar",
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
