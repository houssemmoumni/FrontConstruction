import { Component } from '@angular/core';
import { HeaderLight3Component } from '../../elements/header/header-light3/header-light3.component';
import { Banner1Component } from '../../elements/banner/banner1/banner1.component';
import { Content7Component } from '../../elements/content-box/content7/content7.component';
import { Content12Component } from '../../elements/content-box/content12/content12.component';
import { Content13Component } from '../../elements/content-box/content13/content13.component';
import { Footer13Component } from '../../elements/footer/footer13/footer13.component';
import { ServicesElement19Component } from '../../elements/services/services-element19/services-element19.component';

@Component({
    selector: 'app-about-us2',
    imports: [
        HeaderLight3Component,
        Banner1Component,
        Content7Component,
        Content12Component,
        ServicesElement19Component,
        Content13Component,
        Footer13Component
    ],
    templateUrl: './about-us2.component.html',
    styleUrl: './about-us2.component.css'
})
export class AboutUs2Component {

  banner: any = {
    pagetitle: "About us 2",
    bg_image: "assets/images/banner/bnr3.jpg",
    title: "About us 2",
  }
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  story: any = {
    pagetitle: "OUR STORY",
    heading: 'Running a <br/>successful business <br/><span class="text-primary">since 1955</span>',
    sub_title: 'Industrial engineering is a branch of engineering which deals with the optimization.',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting Factory. Lorem Ipsum has been the Factory\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting Factory.',
    link_text: "Read More",
    url: 'javascript:void(0);',
    image_url: 'assets/images/about/pic6.jpg'
  }

  constructor() { }

  ngOnInit(): void {
  }
}
