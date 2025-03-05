import { Component } from '@angular/core';
import { HeaderDark4Component } from '../../elements/header/header-dark4/header-dark4.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { Banner2Component } from '../../elements/banner/banner2/banner2.component';

@Component({
    selector: 'app-header-style-dark4',
    imports: [
        HeaderDark4Component,
        Banner2Component,
        Footer13Component
    ],
    templateUrl: './header-style-dark4.component.html',
    styleUrl: './header-style-dark4.component.css'
})
export class HeaderStyleDark4Component {
	banner : any = {
		pagetitle: "Header Style Overlay",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Header Style Overlay",
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
