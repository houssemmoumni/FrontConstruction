import { Component } from '@angular/core';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Content15Component } from '../../elements/content-box/content15/content15.component';
import { ServicesElement2Component } from '../../elements/services/services-element2/services-element2.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';

@Component({
    selector: 'app-services2',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Content15Component,
        ServicesElement2Component,
        Footer13Component
    ],
    templateUrl: './services2.component.html',
    styleUrl: './services2.component.css'
})
export class Services2Component {
	banner : any = {
		pagetitle: "Services 2",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Services 2",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
