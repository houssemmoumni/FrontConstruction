import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-call-to-action6',
    imports: [RouterLink],
    templateUrl: './call-to-action6.component.html',
    styleUrl: './call-to-action6.component.css'
})
export class CallToAction6Component {
  @Input() callActionBtnClass: string | null = null;
}
