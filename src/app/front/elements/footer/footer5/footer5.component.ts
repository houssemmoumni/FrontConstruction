import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer5',
    imports: [RouterLink],
    templateUrl: './footer5.component.html',
    styleUrl: './footer5.component.css'
})
export class Footer5Component {
email = 'info@example.com';
}
