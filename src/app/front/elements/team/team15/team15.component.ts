import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team15',
    imports: [
        NgFor,
        RouterLink
    ],
    templateUrl: './team15.component.html',
    styleUrl: './team15.component.css'
})
export class Team15Component {
  @Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }

}
