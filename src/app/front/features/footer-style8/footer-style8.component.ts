import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer8Component } from '../../elements/footer/footer8/footer8.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style8',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer8Component
    ],
    templateUrl: './footer-style8.component.html',
    styleUrl: './footer-style8.component.css'
})
export class FooterStyle8Component {
	banner : any = {
		pagetitle: "Footer 8",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 8",
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
