import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { WorkerService } from '../../../services/worker.service';
import { Worker } from '../../../models/worker.model';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { DeleteConfirmationDialogComponent } from '../../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProjectAssignmentDialogComponent } from './project-assignment-dialog.component';

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatMenuModule, 
        MatButtonModule, 
        RouterLink, 
        MatTableModule, 
        MatPaginatorModule, 
        MatTooltipModule,
        MatIconModule
    ],
    templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'role', 'email', 'phone', 'joindate', 'action'];
    dataSource = new MatTableDataSource<Worker>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private workerService: WorkerService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loadWorkers();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        // Add custom filterPredicate for multiple field search
        this.dataSource.filterPredicate = (data: Worker, filter: string): boolean => {
            const searchStr = filter.toLowerCase();
            return data.name.toLowerCase().includes(searchStr) ||             // Search by name
                   data.email.toLowerCase().includes(searchStr) ||           // Search by email
                   (data.phone?.toLowerCase().includes(searchStr) || '') ||  // Search by phone
                   data.role.toLowerCase().includes(searchStr) ||            // Search by role
                   data.joindate.toLowerCase().includes(searchStr);          // Search by join date
        };
    }

    loadWorkers() {
        this.workerService.getAllWorkers().subscribe({
            next: (workers) => {
                console.group('Workers Data');
                workers.forEach(worker => {
                    console.log(`Worker ${worker.name}:`, {
                        project: worker.projectId,
                        project_id: worker.projectId,
                        hasProject: !!worker.projectId
                    });
                });
                console.groupEnd();
                this.dataSource.data = workers;
            },
            error: (error) => {
                console.error('Error:', error);
                this.showMessage('Failed to load workers', true);
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    deleteWorker(id: number) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '400px',
            disableClose: true,
            position: { top: '100px' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.workerService.deleteWorker(id).subscribe({
                    next: () => {
                        this.loadWorkers();
                        this.showMessage('Worker deleted successfully');
                    },
                    error: (error) => {
                        console.error('Error deleting worker:', error);
                        this.showMessage('Failed to delete worker', true);
                    }
                });
            }
        });
    }

    assignToProject(workerId: number): void {
        const dialogRef = this.dialog.open(ProjectAssignmentDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { workerId }
        });

        dialogRef.afterClosed().subscribe(projectId => {
            if (projectId) {
                this.workerService.assignWorkerToProject(workerId, projectId).subscribe({
                    next: () => {
                        this.showMessage('Worker assigned to project successfully');
                        this.loadWorkers();
                    },
                    error: (error) => {
                        console.error('Error:', error);
                        this.showMessage(error.message || 'Failed to assign worker to project', true);
                    }
                });
            }
        });
    }

    removeFromProject(workerId: number): void {
        const worker = this.dataSource.data.find(w => w.id === workerId);
        
        console.group('Remove Worker from Project');
        console.log('Worker to remove:', worker);
        console.log('Current project:', worker?.currentProject);

        if (!worker?.currentProject) {
            console.warn('No project found for worker');
            console.groupEnd();
            return;
        }

        const confirmSnackBar = this.snackBar.open(
            `Remove ${worker.name} from ${worker.currentProject.projet_name}?`,
            'Remove',
            {
                duration: 5000,
                panelClass: ['warning-snackbar'],
                horizontalPosition: 'center',
                verticalPosition: 'top'
            }
        );

        confirmSnackBar.onAction().subscribe(() => {
            this.workerService.removeWorkerFromProject(workerId).subscribe({
                next: (updatedWorker) => {
                    this.snackBar.open('Worker removed from project successfully', 'Close', {
                        duration: 3000,
                        panelClass: ['success-snackbar']
                    });
                    console.log('Updated worker:', updatedWorker);
                    this.loadWorkers();
                },
                error: (error) => {
                    console.error('Removal failed:', error);
                    this.snackBar.open('Failed to remove worker from project', 'Close', {
                        duration: 3000,
                        panelClass: ['error-snackbar']
                    });
                }
            });
        });
    }

    private showMessage(message: string, isError = false) {
        this.snackBar.open(message, 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: isError ? ['error-snackbar'] : ['success-snackbar']
        });
    }

    // Add debug helper
    hasProject(worker: Worker): boolean {
        if (!worker) return false;
        console.log(`Worker ${worker.name} project status:`, {
            hasProjet: !!worker.projectId,
            projet: worker.projectId,
            projetId: worker.projectId
        });
        return !!worker.projectId;
    }

    // Add this helper method
    debugWorkerStatus(worker: Worker): void {
        console.group(`Worker: ${worker.name}`);
        console.log('Full worker data:', worker);
        console.log('Current Project:', worker.currentProject);
        console.log('Project ID:', worker.projectId);
        console.log('Has Project:', !!worker.currentProject);
        console.groupEnd();
        '';
    }
}