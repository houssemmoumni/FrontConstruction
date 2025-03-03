import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-query-form1',
    imports: [RouterLink],
    templateUrl: './query-form1.component.html',
    styleUrl: './query-form1.component.css'
})
export class QueryForm1Component implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
