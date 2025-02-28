import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';

@Component({
    selector: 'app-privacy-policy',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer13Component
    ],
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
	banner : any = {
		pagetitle: "Privacy Policy",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Privacy Policy",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
