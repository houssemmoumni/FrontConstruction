import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navigation1Component } from '../../navigation/navigation1/navigation1.component';

@Component({
    selector: 'app-header-dark4',
    imports: [
        RouterLink,
        NgClass,
        Navigation1Component
    ],
    templateUrl: './header-dark4.component.html',
    styleUrl: './header-dark4.component.css'
})
export class HeaderDark4Component {
  collapseToggle: boolean = false;
  searchToggle: boolean = false;

  clickEvent() {
    this.collapseToggle = !this.collapseToggle;
  }

  searchOpen() {
    this.searchToggle = !this.searchToggle;
  }
}
