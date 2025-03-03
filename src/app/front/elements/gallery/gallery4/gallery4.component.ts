import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
declare  var jQuery:  any;
declare  var handleLightGallery:  any;

@Component({
    selector: 'app-gallery4',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './gallery4.component.html',
    styleUrl: './gallery4.component.css'
})
export class Gallery4Component {
	@Input() data : any;
  constructor() { }
  ngOnInit(): void {
	  (function ($) {
        handleLightGallery();
    })(jQuery);

 }
}
