import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { HeaderLight1Component } from '../../elements/header/header-light1/header-light1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-header-style1',
    imports: [
        Banner1Component,
        HeaderLight1Component,
        Footer13Component
    ],
    templateUrl: './header-style1.component.html',
    styleUrl: './header-style1.component.css'
})
export class HeaderStyle1Component {
	banner : any = {
		pagetitle: "Header Style Topbar Primary",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Header Style Topbar Primary",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  constructor() { }

  ngOnInit(): void {
  }

}
