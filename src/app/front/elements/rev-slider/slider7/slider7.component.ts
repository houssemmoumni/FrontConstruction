import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_16: any;

@Component({
    selector: 'app-slider7',
    imports: [RouterLink],
    templateUrl: './slider7.component.html',
    styleUrl: './slider7.component.css'
})
export class Slider7Component {

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_16();
      })(jQuery);
    }, 100);
  }
}
