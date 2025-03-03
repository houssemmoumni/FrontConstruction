import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navigation1Component } from '../../navigation/navigation1/navigation1.component';

@Component({
    selector: 'app-header-light15',
    imports: [
        NgClass,
        RouterLink,
        Navigation1Component
    ],
    templateUrl: './header-light15.component.html',
    styleUrl: './header-light15.component.css'
})
export class HeaderLight15Component {
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
