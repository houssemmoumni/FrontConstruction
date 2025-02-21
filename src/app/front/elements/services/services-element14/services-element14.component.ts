import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare  var jQuery:  any;
declare  var handleMasonryFilter2:  any;

@Component({
    selector: 'app-services-element14',
    imports: [
        RouterLink
    ],
    templateUrl: './services-element14.component.html',
    styleUrl: './services-element14.component.css'
})
export class ServicesElement14Component {

  ngOnInit(): void {
    (function ($) {
        handleMasonryFilter2();
    })(jQuery);
}
}
