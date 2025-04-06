import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-banner1',
    imports: [RouterLink],
    templateUrl: './banner1.component.html',
    styleUrl: './banner1.component.css'
})
export class Banner1Component {

	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }

}
