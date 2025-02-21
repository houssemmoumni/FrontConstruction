import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'app-gallery6',
    imports: [RouterLink],
    templateUrl: './gallery6.component.html',
    styleUrl: './gallery6.component.css'
})
export class Gallery6Component {
  ngOnInit(): void {
    (function ($) {
      jQuery('#lightgallery, .lightgallery').lightGallery({
        selector: '.check-km',
        loop: true,
        thumbnail: true,
        exThumbImage: 'data-exthumbimage'
      });
    })(jQuery);

  }
}
