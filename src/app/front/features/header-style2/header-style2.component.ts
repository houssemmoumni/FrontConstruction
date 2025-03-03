import { Component } from '@angular/core';
import { HeaderLight2Component } from '../../elements/header/header-light2/header-light2.component';
import { Banner3Component } from '../../elements/banner/banner3/banner3.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-header-style2',
    imports: [
        HeaderLight2Component,
        Banner3Component,
        Footer13Component
    ],
    templateUrl: './header-style2.component.html',
    styleUrl: './header-style2.component.css'
})
export class HeaderStyle2Component {
  banner : any = {
		pagetitle: "Header Style Curve",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Header Style Curve",
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
