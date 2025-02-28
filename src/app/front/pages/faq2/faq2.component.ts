import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-faq2',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer13Component
    ],
    templateUrl: './faq2.component.html',
    styleUrl: './faq2.component.css'
})
export class Faq2Component {
	banner : any = {
		pagetitle: "Faq 2",
		bg_image: "assets/images/banner/bnr4.jpg",
		title: "Faq 2",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
