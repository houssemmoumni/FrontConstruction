import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer11Component } from '../../elements/footer/footer11/footer11.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style11',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer11Component
    ],
    templateUrl: './footer-style11.component.html',
    styleUrl: './footer-style11.component.css'
})
export class FooterStyle11Component {
	banner : any = {
		pagetitle: "Footer 11",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 11",
	}
  constructor() { }

  ngOnInit(): void {
  }
  email1 = 'info@example.com';
  email2 = 'company@example.com';
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
