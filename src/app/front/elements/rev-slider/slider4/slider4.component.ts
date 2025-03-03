import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_1: any;

@Component({
    selector: 'app-slider4',
    imports: [RouterLink],
    templateUrl: './slider4.component.html',
    styleUrl: './slider4.component.css'
})
export class Slider4Component {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_1();
      })(jQuery);
    }, 100);
  }
}
