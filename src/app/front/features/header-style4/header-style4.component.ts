import { Component } from '@angular/core';
import { HeaderLight4Component } from '../../elements/header/header-light4/header-light4.component';
import { Banner2Component } from '../../elements/banner/banner2/banner2.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-header-style4',
    imports: [
        HeaderLight4Component,
        Banner2Component,
        Footer13Component
    ],
    templateUrl: './header-style4.component.html',
    styleUrl: './header-style4.component.css'
})
export class HeaderStyle4Component {
	banner : any = {
		pagetitle: "Header Style Transparent",
		bg_image: "assets/images/banner/bnr2.jpg",
		title: "Header Style Transparent",
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
