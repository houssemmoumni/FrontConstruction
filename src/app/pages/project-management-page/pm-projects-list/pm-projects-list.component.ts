import { NgIf, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProjectManagementService } from '../../../services/project-management.service';
import { project, StatutProjet } from '../../../models/project.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkerDetailsDialogComponent } from '../../../components/worker-details-dialog/worker-details-dialog.component';
import { ProjectQrDialogComponent } from '../../../components/project-qr-dialog/project-qr-dialog.component';

@Component({
    selector: 'app-pm-projects-list',
    templateUrl: './pm-projects-list.component.html',
    styleUrls: ['./pm-projects-list.component.scss'],
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
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        DatePipe,
        MatDialogModule,
        WorkerDetailsDialogComponent,
        ProjectQrDialogComponent
    ]
})
export class PmProjectsListComponent implements OnInit {
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
    error: any;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public themeService: CustomizerSettingsService,
        private projectService: ProjectManagementService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        console.log('Component initialized');
        this.loadProjects();
        
        // Updated filter predicate to search across all fields
        this.dataSource.filterPredicate = (data: project, filter: string): boolean => {
            const searchStr = filter.toLowerCase();
            
            const searchableValues = [
                data.projet_name?.toLowerCase(),
                data.projet_description?.toLowerCase(),
                data.projectManager?.toLowerCase(),
                data.statut_projet?.toLowerCase(),
                this.formatDateForSearch(data.start_date),
                this.formatDateForSearch(data.end_date),
                data.budget_estime?.toString(),
                data.risque_retard?.toString(),
                data.latitude?.toString(),
                data.longitude?.toString()
            ];

            return searchableValues.some(value => value?.includes(searchStr));
        };
    }

    ngAfterViewInit() {
        if (this.paginator) {
            this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    loadProjects() {
        this.isLoading = true;
        this.error = null;
        this.dataSource.data = [];
        
        this.projectService.getAllProjects().subscribe({
            next: (projects) => {
                console.log('Projects received:', projects);
                if (projects && projects.length > 0) {
                    this.dataSource.data = projects;
                    this.error = null;
                } else {
                    this.dataSource.data = [];
                    this.error = 'No projects found.';
                }
            },
            error: (err) => {
                console.error('Error loading projects:', err);
                this.error = err.message || 'Failed to load projects';
                this.dataSource.data = [];
                
                // Add server check hint if it's a connection error
                if (err.status === 0 || err.status === 500) {
                    this.error += '\nPlease verify that:\n1. The server is running\n2. The API endpoint is correct\n3. You have an active internet connection';
                }
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    deleteProject(projet_id: number) {
        const confirmSnackBar = this.snackBar.open(
            'Are you sure you want to delete this project?', 
            'Delete', 
            {
                duration: 5000,
                panelClass: ['delete-confirmation-snackbar'],
                horizontalPosition: 'center',
                verticalPosition: 'top'
            }
        );

        confirmSnackBar.onAction().subscribe(() => {
            this.projectService.deleteProject(projet_id).subscribe({
                next: () => {
                    this.snackBar.open('Project deleted successfully! 🗑️', 'Close', {
                        duration: 3000,
                        panelClass: ['success-snackbar', 'notification-animation'],
                        horizontalPosition: 'end',
                        verticalPosition: 'top'
                    });
                    this.loadProjects();
                },
                error: (error) => {
                    this.snackBar.open('Failed to delete project!', 'Close', {
                        duration: 3000,
                        panelClass: ['error-snackbar', 'notification-animation'],
                        horizontalPosition: 'end',
                        verticalPosition: 'top'
                    });
                    console.error('Error deleting project:', error);
                }
            });
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

    // Add refresh method
    refreshList() {
        this.loadProjects();
    }

    // Add search method
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    private formatDateForSearch(date: any): string {
        if (!date) return '';
        // Format date in multiple ways to make it searchable
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        
        return [
            d.toLocaleDateString(), // e.g., "1/1/2024"
            d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), // e.g., "Jan 1, 2024"
            d.toISOString().split('T')[0] // e.g., "2024-01-01"
        ].join(' ').toLowerCase();
    }

    showWorkerDetails(workers: any[]): void {
        this.dialog.open(WorkerDetailsDialogComponent, {
            width: '500px',
            data: {
                workers: workers || [],
                projectName: 'Team Members'
            },
            panelClass: 'worker-details-dialog'
        });
    }

    getRandomColor(name: string): string {
        const colors = [
            '#1976d2', '#388e3c', '#d32f2f', '#7b1fa2',
            '#c2185b', '#0288d1', '#303f9f', '#ef6c00'
        ];
        const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[index % colors.length];
    }

    getWorkerCount(workers: any[]): string {
        if (!workers?.length) return 'No team members';
        return `${workers.length} member${workers.length !== 1 ? 's' : ''}`;
    }

    showQrCode(project: any): void {
        console.log('Opening QR dialog for project:', project);
        this.dialog.open(ProjectQrDialogComponent, {
            width: '400px',
            data: { project },
            panelClass: 'qr-dialog'
        });
    }
}