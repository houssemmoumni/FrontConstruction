import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navigation1Component } from '../../navigation/navigation1/navigation1.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header-light1',
    imports: [
        RouterLink,
        NgClass,
        Navigation1Component
    ],
    templateUrl: './header-light1.component.html',
    styleUrl: './header-light1.component.css'
})
export class HeaderLight1Component {

  collapseToggle: boolean = false;
  searchToggle: boolean = false;

  clickEvent() {
    this.collapseToggle = !this.collapseToggle;
  }

  searchOpen() {
    this.searchToggle = !this.searchToggle;
  }
}
