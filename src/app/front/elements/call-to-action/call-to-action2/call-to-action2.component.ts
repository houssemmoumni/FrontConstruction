import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-call-to-action2',
    imports: [RouterLink],
    templateUrl: './call-to-action2.component.html',
    styleUrl: './call-to-action2.component.css'
})
export class CallToAction2Component {
@Input() coutactBtnClass: string | null = null;
}
