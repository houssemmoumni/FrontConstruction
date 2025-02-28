import { Component } from '@angular/core';
import { HeaderDark1Component } from '../../elements/header/header-dark1/header-dark1.component';
import { Banner3Component } from '../../elements/banner/banner3/banner3.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-header-style-dark1',
    imports: [
        Banner3Component,
        HeaderDark1Component,
        Footer13Component
    ],
    templateUrl: './header-style-dark1.component.html',
    styleUrl: './header-style-dark1.component.css'
})
export class HeaderStyleDark1Component {
	banner : any = {
		pagetitle: "Header Style Topbar Primary",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Header Style Topbar Primary",
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
