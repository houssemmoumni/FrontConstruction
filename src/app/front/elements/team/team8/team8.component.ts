import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team8',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './team8.component.html',
    styleUrl: './team8.component.css'
})
export class Team8Component {
	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }

}
