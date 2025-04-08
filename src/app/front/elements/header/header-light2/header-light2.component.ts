import { Component } from '@angular/core';
import { Navigation1Component } from '../../navigation/navigation1/navigation1.component';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header-light2',
    imports: [
        RouterLink,
        NgClass,
        Navigation1Component
    ],
    templateUrl: './header-light2.component.html',
    styleUrl: './header-light2.component.css'
})
export class HeaderLight2Component {
  collapseToggle: boolean = false;
  searchToggle: boolean = false;

  clickEvent() {
    this.collapseToggle = !this.collapseToggle;
  }

  searchOpen() {
    this.searchToggle = !this.searchToggle;
  }
}
