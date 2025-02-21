import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-banner2',
    imports: [],
    templateUrl: './banner2.component.html',
    styleUrl: './banner2.component.css'
})
export class Banner2Component {
	@Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }
}
