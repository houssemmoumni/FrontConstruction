import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer6',
    imports: [RouterLink],
    templateUrl: './footer6.component.html',
    styleUrl: './footer6.component.css'
})
export class Footer6Component {
  @Input() footerClass:String | null = null;
}
