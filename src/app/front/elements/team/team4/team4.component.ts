import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team4',
    imports: [NgFor, RouterLink],
    templateUrl: './team4.component.html',
    styleUrl: './team4.component.css'
})
export class Team4Component {
	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }
}
