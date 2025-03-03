import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-portfolio-details',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer13Component
    ],
    templateUrl: './portfolio-details.component.html',
    styleUrl: './portfolio-details.component.css'
})
export class PortfolioDetailsComponent {
	banner : any = {
		pagetitle: "Portfolio Detail",
		bg_image: "assets/images/banner/bnr4.jpg",
		title: "Portfolio Detail",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
