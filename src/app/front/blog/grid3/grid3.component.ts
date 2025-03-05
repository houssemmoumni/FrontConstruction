import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
declare  var jQuery:  any;
interface blogType {
  image: string,
  date: string,
  userName: string,
  title: string,
  decs: string,
}
@Component({
    selector: 'app-grid3',
    imports: [
        NgClass,
        RouterLink,
        HeaderLight3Component,
        Banner1Component,
        Footer13Component,
    ],
    templateUrl: './grid3.component.html',
    styleUrl: './grid3.component.css'
})
export class Grid3Component {
	banner : any = {
		pagetitle: "Blog grid 3",
		bg_image: "assets/images/banner/bnr1.jpg",
		title: "Blog grid 3",
	}
	layout : any = {
		sidebar: false,
		sidebarPosition:"",
		gridClass:"col-lg-4"
	}
  constructor() { }

	ngOnInit(): void {
		(function ($) {

			var self = jQuery("#masonry, .masonry");
				self.imagesLoaded(function () {
					self.masonry({
						gutterWidth: 15,
						isAnimated: true,
						itemSelector: ".card-container"
					});
				});

		})(jQuery);
	}

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  blogList: blogType[] = [
    {
      image: 'assets/images/blog/grid/pic1.jpg',
      date: '17 Aug 2024',
      userName: 'Oliver',
      title: 'Why Are Children So Obsessed',
      decs: `All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.`,
    },
    {
      image: 'assets/images/blog/grid/pic2.jpg',
      date: '16 Aug 2024',
      userName: 'Harry',
      title: 'How To Get People To Like Industry',
      decs: `All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.`,
    },
    {
      image: 'assets/images/blog/grid/pic3.jpg',
      date: '16 Aug 2024',
      userName: 'Aaron',
      title: 'The Story Of Industry Has Just',
      decs: `All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.`,
    },
    {
      image: 'assets/images/blog/grid/pic4.jpg',
      date: '15 Aug 2024',
      userName: 'Jamie',
      title: 'Seven Outrageous Ideas Industry',
      decs: `All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.`,
    },
    {
      image: 'assets/images/blog/grid/pic1.jpg',
      date: '17 Aug 2024',
      userName: 'Oliver',
      title: 'Why Are Children So Obsessed',
      decs: `All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.`,
    },
    {
      image: 'assets/images/blog/grid/pic2.jpg',
      date: '16 Aug 2024',
      userName: 'Harry',
      title: 'How To Get People To Like Industry',
      decs: `All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.`,
    }
  ]
}
