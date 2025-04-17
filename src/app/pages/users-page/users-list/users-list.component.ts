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
        MatIconModule,
        MatMenuModule
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
                console.log('Loaded workers:', workers); // Debug log
                this.dataSource.data = workers;
            },
            error: (error) => {
                console.error('Error loading workers:', error);
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

    hasProject(worker: Worker): boolean {
        console.log('Worker data:', worker); // Debug log
        // Check both project_id and currentProject
        return worker && (worker.project_id !== null && worker.project_id !== undefined || worker.currentProject !== null);
    }

    assignToProject(workerId: number) {
        const dialogRef = this.dialog.open(ProjectAssignmentDialogComponent, {
            width: '400px',
            data: { workerId }
        });

        dialogRef.afterClosed().subscribe(project_id => {
            if (project_id) {
                this.workerService.assignWorkerToProject(workerId, project_id).subscribe({
                    next: () => {
                        this.showMessage('Worker assigned to project successfully');
                        this.loadWorkers(); // Refresh the list
                    },
                    error: (error) => {
                        console.error('Error:', error);
                        this.showMessage(error.message || 'Failed to assign worker to project', true);
                    }
                });
            }
        });
    }

    removeFromProject(workerId: number) {
        const worker = this.dataSource.data.find(w => w.id === workerId);
        console.log('Removing worker from project:', worker); // Debug log
        
        if (!worker) {
            return;
        }

        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '400px',
            data: {
                title: 'Remove from Project',
                message: `Are you sure you want to remove ${worker.name} from their current project?`,
                confirmText: 'Remove',
                cancelText: 'Cancel'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.workerService.removeWorkerFromProject(workerId).subscribe({
                    next: (updatedWorker) => {
                        console.log('Worker removed successfully:', updatedWorker); // Debug log
                        this.showMessage('Worker removed from project successfully');
                        this.loadWorkers(); // Refresh the list
                    },
                    error: (error) => {
                        console.error('Error removing worker from project:', error);
                        this.showMessage('Failed to remove worker from project', true);
                    }
                });
            }
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
}