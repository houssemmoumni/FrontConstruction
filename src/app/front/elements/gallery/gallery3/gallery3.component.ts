import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var handleMagnificPopup: any;


@Component({
    selector: 'app-gallery3',
    imports: [
        NgIf,
        NgFor,
        RouterLink
    ],
    templateUrl: './gallery3.component.html',
    styleUrl: './gallery3.component.css'
})
export class Gallery3Component {
  @Input() data: any;
  constructor() { }
  ngOnInit(): void {
    (function ($) {
      handleMagnificPopup();
    })(jQuery);
  }
}
