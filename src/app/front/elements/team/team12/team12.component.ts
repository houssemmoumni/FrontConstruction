import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team12',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './team12.component.html',
    styleUrl: './team12.component.css'
})
export class Team12Component {
	@Input() data : any;
  constructor() { }

}
