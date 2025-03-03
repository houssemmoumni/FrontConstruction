import { Component } from '@angular/core';
declare var jQuery: any;
declare var handleMagnificPopup: any;

@Component({
    selector: 'app-counter1',
    imports: [],
    templateUrl: './counter1.component.html',
    styleUrl: './counter1.component.css'
})
export class Counter1Component {
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        jQuery('.counter').counterUp({
          delay: 10,
          time: 3000
        });

        jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,

          fixedContentPos: false
        });

      })(jQuery);
    }, 100)
  }
}
