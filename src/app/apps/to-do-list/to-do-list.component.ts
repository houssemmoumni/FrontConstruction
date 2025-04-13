import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// Services
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { TaskService } from '../../../app/services/task.service';
import { UserService } from '../../../app/services/user.service';
import { NotificationService } from '../../services/notification.service';

// Models
import { Task } from '../../../app/models/task';
import { User } from '../../../app/models/user';
import { RoleType } from '../../../app/models/role-type';
import { TaskStatus } from '../../../app/models/task-status';
import { TaskRequest } from '../../models/task-request';
import { TaskResponse } from '../../models/task-response';
import { NotificationDTO } from '../../models/notification-dto';

// Components
import { TaskCommentsDialogComponent } from '../../../app/task-comments-dialog/task-comments-dialog.component';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatIconModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        FormsModule,
        MatTableModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
    tasks: TaskResponse[] = [];
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    // Component State
    isEditMode = false;
    selectedTaskId!: number;
    minDate: Date;
    classApplied = false;
    showNotification = false;
    notificationMessage = '';
    notificationCount = 0;

    // Data Properties
    displayedColumns: string[] = ['select', 'id', 'title', 'description', 'assignedTo', 'dueDate', 'status', 'actions'];
    dataSource = new MatTableDataSource<TaskResponse>(this.tasks);
    selection = new SelectionModel<TaskResponse>(true, []);
    users: User[] = [];
    ouvriers: User[] = [];
    selectedUserIds!: number;
    statusoptions = Object.values(TaskStatus);

    // Form Model
    task: TaskRequest = {
        title: '',
        description: '',
        assignedToId: 3,
        assignedById: 2,
        dueDate: new Date(),
    };

    // Subscriptions
    private notificationSubscription!: Subscription;

    constructor(
        public themeService: CustomizerSettingsService,
        private dialog: MatDialog,
        private taskService: TaskService,
        private userService: UserService,
        private notificationService: NotificationService,
        private snackBar: MatSnackBar
    ) {
        this.minDate = new Date();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
      }
      

    ngOnInit(): void {
        this.fetchTasks();
        this.fetchOuvriers();
        this.setupNotificationListener();
        
        this.dataSource.filterPredicate = (data: TaskResponse, filter: string) => {
            const lowerCaseFilter = filter.trim().toLowerCase();
            const statusText = data.status ? data.status.toString().toLowerCase() : '';
            return data.title.toLowerCase().includes(lowerCaseFilter) || 
                   statusText.includes(lowerCaseFilter);
        };
    }

    ngOnDestroy(): void {
        if (this.notificationSubscription) {
            this.notificationSubscription.unsubscribe();
        }
    }

    // Data Fetching Methods
    fetchTasks(): void {
        this.taskService.getAllTasks().subscribe({
            next: (tasks) => {
                this.dataSource.data = tasks;
                //this.dataSource.paginator = this.paginator;
                this.checkPendingTasks(tasks);
            },
            error: (err) => console.error('Error fetching tasks:', err)
        });
    }

    fetchOuvriers(): void {
        this.userService.getOuvriers().subscribe({
            next: (users) => {
                this.ouvriers = users;
                console.log('Fetched ouvriers:', users);
            },
            error: (err) => console.error('Error fetching ouvriers:', err)
        });
    }

    // Notification Handling
    private setupNotificationListener(): void {
        this.notificationSubscription = this.notificationService.notification$.subscribe({
            next: (notification) => this.handleNotification(notification),
            error: (err) => console.error('Notification error:', err)
        });
    }

    private checkPendingTasks(tasks: TaskResponse[]): void {
        const pendingCount = tasks.filter(task => task.status === TaskStatus.PENDING).length;
        if (pendingCount >= 7) {
            this.showSnackbarNotification(`⚠️ You have ${pendingCount} pending tasks!`);
        }
    }

    private handleNotification(notification: NotificationDTO): void {
        this.showSnackbarNotification(
            `${notification.message} (${notification.pendingCount} pending tasks)`
        );
    }

    private showSnackbarNotification(message: string): void {
        this.snackBar.open(message, 'Dismiss', {
            duration: 5000,
            panelClass: ['notification-snackbar']
        });
    }

    // Task CRUD Operations
    addTask(task: TaskRequest): void {
        this.taskService.createTask(task).subscribe({
            next: () => {
                this.fetchTasks();
                this.toggleClass();
                this.resetTaskForm();
            },
            error: (err) => console.error('Error creating task:', err)
        });
    }

    updateTask(task: TaskResponse): void {
        this.selectedTaskId = task.id;
        this.isEditMode = true;
        this.task = {
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: new Date(task.dueDate),
            assignedById: 1,
            assignedToId: 2
        };
        this.toggleClass();
    }

    saveUpdatedTask(): void {
        if (this.selectedTaskId) {
            this.taskService.updateTask(this.selectedTaskId, this.task).subscribe({
                next: () => {
                    this.fetchTasks();
                    this.toggleClass();
                    this.resetTaskForm();
                },
                error: (err) => console.error('Error updating task:', err)
            });
        }
    }

    deleteTask(taskId: number): void {
        console.log('Attempting to delete task with ID:', taskId); // Log when delete is triggered

        this.taskService.deleteTask(taskId).subscribe({
            next: () => {
                console.log('Task deleted successfully, refreshing task list');

                 this.fetchTasks();},
            error: (err) => console.error('Error deleting task:', err)
        });
    }

    // UI Helper Methods
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    resetTaskForm(): void {
        this.task = {
            title: '',
            description: '',
            assignedToId: 1,
            assignedById: 2,
            dueDate: new Date(),
            status: TaskStatus.PENDING,
        };
    }

    isFormValid(): boolean {
        return !!(this.task.title && this.task.title.length >= 3 &&
               this.task.description &&
               this.task.assignedToId &&
               this.task.dueDate &&
               this.task.status);
    }

    toggleClass(): void {
        this.classApplied = !this.classApplied;
        if (!this.classApplied) {
            this.isEditMode = false;
            this.resetTaskForm();
        }
    }

    // Table Selection Methods
    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows(): void {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    checkboxLabel(row?: TaskResponse): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    // Date Handling
    onDateChange(event: any): void {
        if (!event.value) return;
        const selectedDate = event.value;
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        this.task.dueDate = `${year}-${month}-${day}`;
    }

    // Dialog Methods
    openCommentsDialog(task: TaskResponse): void {
        this.dialog.open(TaskCommentsDialogComponent, {
            width: '600px',
            data: { task }
        });
    }
}