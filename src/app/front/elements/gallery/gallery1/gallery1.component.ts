import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import lgZoom from 'lightgallery/plugins/zoom';
declare var jQuery: any;

@Component({
    selector: 'app-gallery1',
    imports: [RouterLink],
    templateUrl: './gallery1.component.html',
    styleUrl: './gallery1.component.css',
})
export class Gallery1Component {
    ngOnInit(): void {
        (function ($) {
            jQuery('#lightgallery, .lightgallery').lightGallery({
                selector: '.check-km',
                loop: true,
                thumbnail: true,
                exThumbImage: 'data-exthumbimage',
            });
        })(jQuery);
    }
}
