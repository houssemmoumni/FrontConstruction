import { Component } from '@angular/core';
import { HeaderDark3Component } from '../../elements/header/header-dark3/header-dark3.component';
import { Banner3Component } from '../../elements/banner/banner3/banner3.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-header-style-dark3',
    imports: [
        HeaderDark3Component,
        Banner3Component,
        Footer13Component
    ],
    templateUrl: './header-style-dark3.component.html',
    styleUrl: './header-style-dark3.component.css'
})
export class HeaderStyleDark3Component {
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
