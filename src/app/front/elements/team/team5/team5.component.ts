import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team5',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './team5.component.html',
    styleUrl: './team5.component.css'
})
export class Team5Component {
	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }
}
