import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_1: any;

@Component({
    selector: 'app-slider6',
    imports: [RouterLink],
    templateUrl: './slider6.component.html',
    styleUrl: './slider6.component.css'
})
export class Slider6Component {
  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_1();
      })(jQuery);
    }, 100);
  }
}
