import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer6Component } from '../../elements/footer/footer6/footer6.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-footer-style6',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer6Component
    ],
    templateUrl: './footer-style6.component.html',
    styleUrl: './footer-style6.component.css'
})
export class FooterStyle6Component {
  footerClass = 'bg-black-1';
	banner : any = {
		pagetitle: "Footer 6",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 6",
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
