import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer2Component } from '../../elements/footer/footer2/footer2.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style2',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer2Component
    ],
    templateUrl: './footer-style2.component.html',
    styleUrl: './footer-style2.component.css'
})
export class FooterStyle2Component {
	banner : any = {
		pagetitle: "Footer 2",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 2",
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
