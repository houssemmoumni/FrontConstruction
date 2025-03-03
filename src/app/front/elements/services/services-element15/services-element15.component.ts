import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'app-services-element15',
    imports: [RouterLink],
    templateUrl: './services-element15.component.html',
    styleUrl: './services-element15.component.css'
})
export class ServicesElement15Component {

  ngOnInit(): void {
    (function ($) {
      jQuery('.img-carousel').owlCarousel({
        loop: true,
        margin: 30,
        autoplaySpeed: 3000,
        navSpeed: 3000,
        paginationSpeed: 3000,
        slideSpeed: 3000,
        smartSpeed: 3000,
        autoplay: 3000,
        nav: true,
        dots: false,
        navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
        responsive: {
          0: {
            items: 1
          },
          480: {
            items: 2
          },
          1024: {
            items: 3
          },
          1200: {
            items: 4
          }
        }
      })
    })(jQuery);

  }
}
