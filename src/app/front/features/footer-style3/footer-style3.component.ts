import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer3Component } from '../../elements/footer/footer3/footer3.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style3',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer3Component
    ],
    templateUrl: './footer-style3.component.html',
    styleUrl: './footer-style3.component.css'
})
export class FooterStyle3Component {
	banner : any = {
		pagetitle: "Footer 3",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 3",
	}

  constructor() { }

  ngOnInit(): void {
  }

  email ='info@example.com';
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
