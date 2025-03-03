import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { ProjectManagementService } from '../../../../services/project-management.service';

@Component({
    selector: 'app-total-projects',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './total-projects.component.html',
    styleUrls: ['./total-projects.component.scss']
})
export class TotalProjectsComponent implements OnInit {
    totalProjects: number = 0;
    isLoading = true;

    constructor(
        public themeService: CustomizerSettingsService,
        private projectService: ProjectManagementService
    ) {}

    ngOnInit() {
        this.loadTotalProjects();
    }

    loadTotalProjects() {
        this.projectService.getAllProjects().subscribe({
            next: (projects) => {
                this.totalProjects = projects.length;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading projects:', error);
                this.isLoading = false;
            }
        });
    }
}