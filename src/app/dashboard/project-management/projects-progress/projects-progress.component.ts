import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectManagementService } from '../../../services/project-management.service';
import { StatutProjet, project } from '../../../models/projectt.model';

@Component({
    selector: 'app-projects-progress:not(p)',
    imports: [MatCardModule, MatMenuModule, MatButtonModule],
    templateUrl: './projects-progress.component.html',
    styleUrl: './projects-progress.component.scss'
})
export class ProjectsProgressComponent implements OnInit {
    isLoading = true;
    projectStats = {
        EN_COURS: 0,
        PLANIFICATION: 0,
        TERMINÉ: 0,
        ANNULE: 0
    };
    hasData = false;

    constructor(
        private projectService: ProjectManagementService
    ) {}

    ngOnInit(): void {
        this.loadProjectStats();
    }

    loadProjectStats() {
        this.projectService.getAllProjects().subscribe({
            next: (projects) => {
                this.calculateStats(projects);
                this.renderChart();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading projects:', error);
                this.isLoading = false;
            }
        });
    }

    private calculateStats(projects: project[]) {
        const total = projects.length;
        this.hasData = total > 0;
        if (!this.hasData) return;

        // Count projects by status
        const counts = projects.reduce((acc, project) => {
            acc[project.statut_projet] = (acc[project.statut_projet] || 0) + 1;
            return acc;
        }, {} as Record<StatutProjet, number>);

        // Calculate percentages
        this.projectStats = {
            EN_COURS: (counts[StatutProjet.EN_COURS] || 0) / total * 100,
            PLANIFICATION: (counts[StatutProjet.PLANIFICATION] || 0) / total * 100,
            TERMINÉ: (counts[StatutProjet.TERMINÉ] || 0) / total * 100,
            ANNULE: (counts[StatutProjet.ANNULE] || 0) / total * 100
        };
    }

    private async renderChart() {
        try {
            const ApexCharts = (await import('apexcharts')).default;
            const options = {
                series: [
                    this.projectStats.EN_COURS,
                    this.projectStats.PLANIFICATION,
                    this.projectStats.TERMINÉ,
                    this.projectStats.ANNULE
                ],
                chart: {
                    height: 396,
                    type: "donut"
                },
                labels: ["In Progress", "Planning", "Completed", "Cancelled"],
                colors: ["#2196f3", "#ff9800", "#4caf50", "#f44336"],
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    y: {
                        formatter: function(value: number) {
                            return value.toFixed(1) + '%';
                        }
                    }
                }
            };

            const chart = new ApexCharts(document.querySelector('#pm_projects_progress_chart'), options);
            chart.render();
        } catch (error) {
            console.error('Error rendering chart:', error);
        }
    }
}
