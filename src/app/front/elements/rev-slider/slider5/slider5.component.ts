import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var dz_rev_slider_14: any;

@Component({
    selector: 'app-slider5',
    imports: [RouterLink],
    templateUrl: './slider5.component.html',
    styleUrl: './slider5.component.css'
})
export class Slider5Component {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        dz_rev_slider_14();
      })(jQuery);
    }, 100);
  }
}
