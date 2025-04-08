import { Component } from '@angular/core';
import { HeaderLight7Component } from '../elements/header/header-light7/header-light7.component';
import { Slider2Component } from '../elements/rev-slider/slider2/slider2.component';
import { ServicesElement2Component } from '../elements/services/services-element2/services-element2.component';
import { Footer20Component } from '../elements/footer/footer20/footer20.component';

@Component({
    selector: 'app-home-oil-plant',
    imports: [
        HeaderLight7Component,
        Slider2Component,
        ServicesElement2Component,
        Footer20Component
    ],
    templateUrl: './home-oil-plant.component.html',
    styleUrl: './home-oil-plant.component.css'
})
export class HomeOilPlantComponent {

  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
