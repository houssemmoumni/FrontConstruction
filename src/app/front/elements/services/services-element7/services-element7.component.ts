import { NgFor } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'app-services-element7',
    imports: [RouterLink, NgFor],
    templateUrl: './services-element7.component.html',
    styleUrl: './services-element7.component.css'
})
export class ServicesElement7Component {

  @Input() data: any = null;

  ngOnInit(): void {
    setTimeout(() => {
      (function ($) {
        jQuery('.about-ser-carousel').owlCarousel({
          loop: true,
          autoplaySpeed: 3000,
          navSpeed: 3000,
          paginationSpeed: 3000,
          slideSpeed: 3000,
          smartSpeed: 3000,
          autoplay: 3000,
          margin: 30,
          nav: true,
          dots: false,
          navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
          responsive: {
            0: {
              items: 1
            },
            480: {
              items: 2
            },
            1024: {
              items: 2
            },
            1200: {
              items: 3
            }
          }
        })
      })(jQuery);
    }, 1000);
  }
}
