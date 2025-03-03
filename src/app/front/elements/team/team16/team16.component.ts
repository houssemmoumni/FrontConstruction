import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team16',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './team16.component.html',
    styleUrl: './team16.component.css'
})
export class Team16Component {
	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }
}
