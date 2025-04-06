import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer5Component } from '../../elements/footer/footer5/footer5.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style5',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer5Component
    ],
    templateUrl: './footer-style5.component.html',
    styleUrl: './footer-style5.component.css'
})
export class FooterStyle5Component {
	banner : any = {
		pagetitle: "Footer 5",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 5",
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
