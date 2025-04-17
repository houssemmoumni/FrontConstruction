import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-project-management-page',
    templateUrl: './project-management-page.component.html',
    styleUrls: ['./project-management-page.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class ProjectManagementPageComponent {}