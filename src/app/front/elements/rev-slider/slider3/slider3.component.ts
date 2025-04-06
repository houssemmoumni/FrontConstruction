import { Component } from '@angular/core';
declare var jQuery: any;
declare var dz_rev_slider_5: any;

@Component({
    selector: 'app-slider3',
    imports: [],
    templateUrl: './slider3.component.html',
    styleUrl: './slider3.component.css'
})
export class Slider3Component {
  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_5();
      })(jQuery);
    }, 100);
  }
}
