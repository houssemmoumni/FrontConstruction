import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navigation1Component } from '../../navigation/navigation1/navigation1.component';

@Component({
    selector: 'app-header-light9',
    imports: [
        NgClass,
        RouterLink,
        Navigation1Component
    ],
    templateUrl: './header-light9.component.html',
    styleUrl: './header-light9.component.css'
})
export class HeaderLight9Component {
  collapseToggle: boolean = false;
  searchToggle: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  clickEvent() {
    this.collapseToggle = !this.collapseToggle;
  }

  searchOpen() {
    this.searchToggle = !this.searchToggle;
  }
}
