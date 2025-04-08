import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navigation2Component } from '../../navigation/navigation2/navigation2.component';

@Component({
    selector: 'app-header-light13',
    imports: [
        NgClass,
        RouterLink,
        Navigation2Component
    ],
    templateUrl: './header-light13.component.html',
    styleUrl: './header-light13.component.css'
})
export class HeaderLight13Component {
  collapseToggle: boolean = false;
  searchToggle: boolean = false;
  email= 'exemple@gmail.com';
  constructor() {}

  ngOnInit(): void {}

  clickEvent() {
    this.collapseToggle = !this.collapseToggle;
  }

  searchOpen() {
    this.searchToggle = !this.searchToggle;
  }
}
