import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navigation1Component } from '../../navigation/navigation1/navigation1.component';
declare  var jQuery:  any;
declare  var handleHamburgerMenu:  any;

@Component({
    selector: 'app-header-light19',
    imports: [
        NgClass,
        RouterLink,
        Navigation1Component
    ],
    templateUrl: './header-light19.component.html',
    styleUrl: './header-light19.component.css'
})
export class HeaderLight19Component {
  collapseToggle: boolean = false;
  searchToggle: boolean = false;

  constructor() {}
  clickEvent() {
    this.collapseToggle = !this.collapseToggle;
  }

  searchOpen() {
    this.searchToggle = !this.searchToggle;
  }

  ngOnInit(): void {
    (function ($) {
        handleHamburgerMenu();
    })(jQuery);
}

}
