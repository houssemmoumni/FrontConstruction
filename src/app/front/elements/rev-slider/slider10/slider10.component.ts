import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_8: any;

@Component({
    selector: 'app-slider10',
    imports: [RouterLink],
    templateUrl: './slider10.component.html',
    styleUrl: './slider10.component.css'
})
export class Slider10Component {

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_8();
      })(jQuery);
    }, 100);
  }
}
