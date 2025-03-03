import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_12: any;

@Component({
    selector: 'app-slider8',
    imports: [RouterLink],
    templateUrl: './slider8.component.html',
    styleUrl: './slider8.component.css'
})
export class Slider8Component {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_12();
      })(jQuery);
    }, 100);
  }
}
