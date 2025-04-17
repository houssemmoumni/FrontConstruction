import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { ProjectManagementService } from '../../../../services/project-management.service';

@Component({
    selector: 'app-completed-projects',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
        <mat-card class="daxa-card completed-projects-card border-radius border-none d-block" [class.component-dark-theme]="themeService.isDark()">
            <mat-card-content>
                <div class="d-flex justify-content-between">
                    <div class="title">
                        <h5>Completed Projects</h5>
                        <div class="number fw-medium lh-1">{{completedProjects}}</div>
                    </div>
                    <div class="icon text-center bg-info rounded-circle text-white position-relative">
                        <i class="ri-check-double-line"></i>
                    </div>
                </div>
                <div class="info d-flex align-items-center justify-content-between">
                    <span class="sub-title d-block text-body">Projects this month</span>
                    <span class="daxa-up-down-badge position-relative">
                        <i class="material-symbols-outlined">trending_up</i>
                        4.75%
                    </span>
                </div>
            </mat-card-content>
        </mat-card>
    `
})
export class CompletedProjectsComponent implements OnInit {
    completedProjects: number = 0;

    constructor(
        public themeService: CustomizerSettingsService,
        private projectService: ProjectManagementService
    ) {}

    ngOnInit() {
        this.loadCompletedProjects();
    }

    private loadCompletedProjects() {
        this.projectService.getAllProjects().subscribe({
            next: (projects) => {
                const today = new Date();
                this.completedProjects = projects.filter(project => {
                    if (!project.end_date) return false;
                    const endDate = new Date(project.end_date);
                    return endDate < today;
                }).length;
            },
            error: (error) => {
                console.error('Error loading completed projects:', error);
                this.completedProjects = 0;
            }
        });
    }
}