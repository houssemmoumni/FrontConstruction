import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team10',
    imports: [
        NgFor,
        RouterLink,
    ],
    templateUrl: './team10.component.html',
    styleUrl: './team10.component.css'
})
export class Team10Component {
	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }
}
