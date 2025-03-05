import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog4',
    imports: [RouterLink],
    templateUrl: './blog4.component.html',
    styleUrl: './blog4.component.css'
})
export class Blog4Component {

	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }
}
