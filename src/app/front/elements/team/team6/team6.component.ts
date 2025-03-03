import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team6',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './team6.component.html',
    styleUrl: './team6.component.css'
})
export class Team6Component {
	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }
}
