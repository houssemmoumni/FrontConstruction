import { Component } from '@angular/core';
declare var jQuery: any;
declare var dz_rev_slider_11: any;
@Component({
    selector: 'app-slider9',
    imports: [],
    templateUrl: './slider9.component.html',
    styleUrl: './slider9.component.css'
})
export class Slider9Component {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_11();
      })(jQuery);
    }, 100);
  }
}
