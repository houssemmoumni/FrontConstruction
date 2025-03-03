import { Component } from '@angular/core';
import { Banner3Component } from '../../elements/banner/banner3/banner3.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderDark2Component } from '../../elements/header/header-dark2/header-dark2.component';

@Component({
    selector: 'app-header-style-dark2',
    imports: [
        HeaderDark2Component,
        Banner3Component,
        Footer13Component
    ],
    templateUrl: './header-style-dark2.component.html',
    styleUrl: './header-style-dark2.component.css'
})
export class HeaderStyleDark2Component {
	banner : any = {
		pagetitle: "Header Style Curve",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Header Style Curve",
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
