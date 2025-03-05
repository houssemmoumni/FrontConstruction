import { Component } from '@angular/core';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error405',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Footer13Component,
        RouterLink
    ],
    templateUrl: './error405.component.html',
    styleUrl: './error405.component.css'
})
export class Error405Component {
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
