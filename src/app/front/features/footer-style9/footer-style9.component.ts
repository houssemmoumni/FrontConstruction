import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer9Component } from '../../elements/footer/footer9/footer9.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style9',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer9Component
    ],
    templateUrl: './footer-style9.component.html',
    styleUrl: './footer-style9.component.css'
})
export class FooterStyle9Component {
	banner : any = {
		pagetitle: "Footer 9",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 9",
	}
  constructor() { }

  ngOnInit(): void {
  }
  email = 'info@example.com';
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
