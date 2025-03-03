import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team7',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './team7.component.html',
    styleUrl: './team7.component.css'
})
export class Team7Component {
  @Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }
}
