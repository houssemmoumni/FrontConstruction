import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer3',
    imports: [
        RouterLink
    ],
    templateUrl: './footer3.component.html',
    styleUrl: './footer3.component.css'
})
export class Footer3Component {
email = 'info@example.com';
}
