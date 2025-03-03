import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { ProjectManagementService } from '../../../../services/project-management.service';

@Component({
    selector: 'app-active-projects',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    template: `
        <mat-card class="daxa-card active-projects-card border-radius border-none d-block" [class.component-dark-theme]="themeService.isDark()">
            <mat-card-content>
                <div class="d-flex justify-content-between">
                    <div class="title">
                        <h5>Active Projects</h5>
                        <div class="number fw-medium lh-1">{{activeProjects}}</div>
                    </div>
                    <div class="icon text-center bg-success rounded-circle text-white position-relative">
                        <i class="ri-time-line"></i>
                    </div>
                </div>
                <div class="info d-flex align-items-center justify-content-between">
                    <span class="sub-title d-block text-body">Projects this month</span>
                    <span class="daxa-up-down-badge position-relative">
                        <i class="material-symbols-outlined">trending_up</i>
                        2.95%
                    </span>
                </div>
            </mat-card-content>
        </mat-card>
    `
})
export class ActiveProjectsComponent implements OnInit {
    activeProjects: number = 0;

    constructor(
        public themeService: CustomizerSettingsService,
        private projectService: ProjectManagementService
    ) {
        this.loadActiveProjects();
    }

    ngOnInit() {
        this.loadActiveProjects();
    }

    private loadActiveProjects() {
        this.projectService.getAllProjects().subscribe({
            next: (projects) => {
                const today = new Date();
                this.activeProjects = projects.filter(project => {
                    const startDate = new Date(project.start_date);
                    const endDate = project.end_date ? new Date(project.end_date) : null;
                    return startDate <= today && (!endDate || today <= endDate);
                }).length;
            },
            error: (error) => {
                console.error('Error loading active projects:', error);
                this.activeProjects = 0;
            }
        });
    }
}