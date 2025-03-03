import { NgFor } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;
declare var handleMasonryFilter2: any;
declare var handleLightGallery: any;

@Component({
    selector: 'app-content17',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './content17.component.html',
    styleUrl: './content17.component.css'
})
export class Content17Component {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        handleMasonryFilter2();
        handleLightGallery();
      })(jQuery);
    }, 100)
  }
}
