import { Component } from '@angular/core';
import { Navigation1Component } from '../../navigation/navigation1/navigation1.component';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header-dark1',
    imports: [
        RouterLink,
        NgClass,
        Navigation1Component
    ],
    templateUrl: './header-dark1.component.html',
    styleUrl: './header-dark1.component.css'
})
export class HeaderDark1Component {
  collapseToggle: boolean = false;
  searchToggle: boolean = false;

  clickEvent() {
    this.collapseToggle = !this.collapseToggle;
  }

  searchOpen() {
    this.searchToggle = !this.searchToggle;
  }
}
