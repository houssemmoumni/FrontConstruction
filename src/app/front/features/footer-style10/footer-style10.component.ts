import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer10Component } from '../../elements/footer/footer10/footer10.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style10',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer10Component
    ],
    templateUrl: './footer-style10.component.html',
    styleUrl: './footer-style10.component.css'
})
export class FooterStyle10Component {

	banner : any = {
		pagetitle: "Footer 10",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 10",
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
