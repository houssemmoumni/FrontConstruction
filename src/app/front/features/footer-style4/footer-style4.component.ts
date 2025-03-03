import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer4Component } from '../../elements/footer/footer4/footer4.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style4',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer4Component
    ],
    templateUrl: './footer-style4.component.html',
    styleUrl: './footer-style4.component.css'
})
export class FooterStyle4Component {
	banner : any = {
		pagetitle: "Footer 4",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 4",
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
