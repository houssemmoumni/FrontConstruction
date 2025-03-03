import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { IconBox4Component } from '../../elements/icon-box/icon-box4/icon-box4.component';

@Component({
    selector: 'app-help-desk',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer13Component,
        IconBox4Component
    ],
    templateUrl: './help-desk.component.html',
    styleUrl: './help-desk.component.css'
})
export class HelpDeskComponent {
  banner : any = {
		pagetitle: "Help Desk",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Help Desk",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
