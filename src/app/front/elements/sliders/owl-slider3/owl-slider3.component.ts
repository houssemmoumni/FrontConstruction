import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare  var jQuery:  any;
declare  var handleowlCarousel:  any;


@Component({
    selector: 'app-owl-slider3',
    imports: [RouterLink],
    templateUrl: './owl-slider3.component.html',
    styleUrl: './owl-slider3.component.css'
})
export class OwlSlider3Component {
  constructor() { }
    ngOnInit(): void {
        (function ($) {
            handleowlCarousel();
        })(jQuery);
    }

}
