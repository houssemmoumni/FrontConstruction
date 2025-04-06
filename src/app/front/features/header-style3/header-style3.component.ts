import { Component } from '@angular/core';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Banner3Component } from '../../elements/banner/banner3/banner3.component';


@Component({
    selector: 'app-header-style3',
    imports: [
        HeaderLight3Component,
        Banner3Component,
        Footer13Component,
    ],
    templateUrl: './header-style3.component.html',
    styleUrl: './header-style3.component.css'
})
export class HeaderStyle3Component {

  ngOnInit(): void {
  }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
	banner : any = {
		pagetitle: "Header Style Topbar Primary",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "Header Style Topbar Primary",
	}


}
