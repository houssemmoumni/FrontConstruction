import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { IconBox2Component } from '../../elements/icon-box/icon-box2/icon-box2.component';
declare var jQuery: any;
declare var handleMagnificPopup: any;

@Component({
    selector: 'app-faq1',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        IconBox2Component,
        Footer13Component
    ],
    templateUrl: './faq1.component.html',
    styleUrl: './faq1.component.css'
})
export class Faq1Component {
  banner : any = {
		pagetitle: "Faq 1",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Faq 1",
	}
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  ngOnInit(): void {
    (function ($) {
      handleMagnificPopup();
    })(jQuery);
  }
}
