import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-content7',
    imports: [RouterLink],
    templateUrl: './content7.component.html',
    styleUrl: './content7.component.css'
})
export class Content7Component {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }
}
