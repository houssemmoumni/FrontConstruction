import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer7Component } from '../../elements/footer/footer7/footer7.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style7',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer7Component
    ],
    templateUrl: './footer-style7.component.html',
    styleUrl: './footer-style7.component.css'
})
export class FooterStyle7Component {
	banner : any = {
		pagetitle: "Footer 7",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 7",
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
