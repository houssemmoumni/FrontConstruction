import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_15: any;

@Component({
    selector: 'app-slider13',
    imports: [
        RouterLink
    ],
    templateUrl: './slider13.component.html',
    styleUrl: './slider13.component.css'
})
export class Slider13Component {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_15();
      })(jQuery);
    }, 100);
  }
}
