import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_2: any;

@Component({
    selector: 'app-slider1',
    imports: [
        RouterLink
    ],
    templateUrl: './slider1.component.html',
    styleUrl: './slider1.component.css'
})
export class Slider1Component {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_2();
      })(jQuery);
    }, 100);
  }
}
