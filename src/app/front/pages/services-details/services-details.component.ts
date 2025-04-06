import { Component } from '@angular/core';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-services-details',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer13Component
    ],
    templateUrl: './services-details.component.html',
    styleUrl: './services-details.component.css'
})
export class ServicesDetailsComponent {

	banner : any = {
		pagetitle: "Service Details",
		bg_image: "assets/images/banner/bnr2.jpg",
		title: "Service Details",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
