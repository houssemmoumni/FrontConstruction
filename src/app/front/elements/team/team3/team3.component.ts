import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-team3',
    imports: [
        RouterLink,
        NgFor
    ],
    templateUrl: './team3.component.html',
    styleUrl: './team3.component.css'
})
export class Team3Component {
  @Input() data : any;
  constructor(){}

  ngOnInit(): void {

  }
}
