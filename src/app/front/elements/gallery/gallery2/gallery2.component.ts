import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare  var jQuery:  any;
declare  var handleMasonryFilter2:  any;
declare  var handleLightGallery:  any;

@Component({
    selector: 'app-gallery2',
    imports: [RouterLink],
    templateUrl: './gallery2.component.html',
    styleUrl: './gallery2.component.css'
})
export class Gallery2Component {
  constructor() { }
    ngOnInit(): void {
        (function ($) {
            handleMasonryFilter2();
            handleLightGallery();
        })(jQuery);
    }

}
