import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_3: any;
@Component({
    selector: 'app-slider12',
    imports: [RouterLink],
    templateUrl: './slider12.component.html',
    styleUrl: './slider12.component.css'
})
export class Slider12Component {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_3();
      })(jQuery);
    }, 100);
  }
}
