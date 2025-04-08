import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer12Component } from '../../elements/footer/footer12/footer12.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style12',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer12Component
    ],
    templateUrl: './footer-style12.component.html',
    styleUrl: './footer-style12.component.css'
})
export class FooterStyle12Component {
  banner : any = {
		pagetitle: "Footer 12",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 12",
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
