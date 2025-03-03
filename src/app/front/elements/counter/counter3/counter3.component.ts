import { Component } from '@angular/core';
declare var jQuery: any;
@Component({
    selector: 'app-counter3',
    imports: [],
    templateUrl: './counter3.component.html',
    styleUrl: './counter3.component.css'
})
export class Counter3Component {
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
    }, 100);
  }
}
