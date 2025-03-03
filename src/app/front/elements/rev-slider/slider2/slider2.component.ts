import { Component } from '@angular/core';
declare var jQuery: any;
declare var dz_rev_slider_4: any;

@Component({
    selector: 'app-slider2',
    imports: [],
    templateUrl: './slider2.component.html',
    styleUrl: './slider2.component.css'
})
export class Slider2Component {

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_4();
      })(jQuery);
    }, 100);
  }
}
