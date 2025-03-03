import { NgIf, CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProjectManagementService } from '../../../services/project-management.service';
import { project, StatutProjet } from '../../../models/project.model';

@Component({
    selector: 'app-all-projects',
    templateUrl: './all-projects.component.html',
    styleUrls: ['./all-projects.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        RouterLink,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        DatePipe,
        CurrencyPipe
    ]
})
export class AllProjectsComponent implements OnInit {
    displayedColumns: string[] = [
        'projet_name',
        'projet_description',
        'start_date',
        'end_date',
        'projectManager',
        'budget_estime',
        'statut_projet',
        'action'
    ];
    dataSource = new MatTableDataSource<project>();
    isLoading = true;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private projectService: ProjectManagementService,
        public themeService: CustomizerSettingsService
    ) {}

    ngOnInit() {
        this.loadProjects();
    }

    ngAfterViewInit() {
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
    }

    loadProjects() {
        this.isLoading = true;
        this.projectService.getAllProjects().subscribe({
            next: (projects) => {
                console.log('Loaded projects:', projects);
                this.dataSource.data = projects;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading projects:', error);
                this.isLoading = false;
            }
        });
    }

    getStatusClass(status: StatutProjet): string {
        switch (status) {
            case StatutProjet.EN_COURS: return 'in-progress';
            case StatutProjet.PLANIFICATION: return 'pending';
            case StatutProjet.TERMINÉ: return 'completed';
            case StatutProjet.ANNULE: return 'not-started';
            default: return '';
     }
    }
}