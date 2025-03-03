import { Component } from '@angular/core';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer1Component } from '../../elements/footer/footer1/footer1.component';

@Component({
    selector: 'app-footer-style1',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer1Component
    ],
    templateUrl: './footer-style1.component.html',
    styleUrl: './footer-style1.component.css'
})
export class FooterStyle1Component {
	banner : any = {
		pagetitle: "Footer 1",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Footer 1",
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
