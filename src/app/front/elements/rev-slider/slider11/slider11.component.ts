import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_13: any;
@Component({
    selector: 'app-slider11',
    imports: [RouterLink],
    templateUrl: './slider11.component.html',
    styleUrl: './slider11.component.css'
})
export class Slider11Component {
  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_13();
      })(jQuery);
    }, 100);
  }
}
