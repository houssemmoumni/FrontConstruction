import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team11',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './team11.component.html',
    styleUrl: './team11.component.css'
})
export class Team11Component {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
