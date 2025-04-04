import { NgIf } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Add this import
import { CommonModule } from '@angular/common'; // <-- Add this import
import {MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { TaskService } from '../../../app/services/task.service'; // Import the service
import { UserService } from '../../../app/services/user.service'; // Import the service
import { Task } from '../../../app/models/task'; // Ensure the correct model is imported
import { User } from '../../../app/models/user'; // Ensure the correct model is imported
import { RoleType } from '../../../app/models/role-type'; // Import RoleType
import { TaskStatus } from '../../../app/models/task-status'; // Ensure the correct model is imported
import { TaskRequest } from '../../models/task-request';
import { TaskResponse } from '../../models/task-response';
import { TaskCommentsDialogComponent } from '../../../app/task-comments-dialog/task-comments-dialog.component';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-to-do-list',
    imports: [    CommonModule,    MatPaginatorModule,    MatIconModule,  // Add this line
        // <-- Add this import
        // <-- Add this line
        MatCardModule, MatMenuModule, MatButtonModule, RouterLink,    FormsModule, // <-- Add this line
        MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
    templateUrl: './to-do-list.component.html',
    styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit{
    @ViewChild(MatPaginator) paginator!: MatPaginator; // <-- Add this

    isEditMode = false; // Add this flag
    selectedTaskId!: number;
    minDate: Date;



    displayedColumns: string[] = ['select',
    'id', 'title', 'description', 'assignedTo', 'dueDate', 'status', 'actions'];    
    dataSource = new MatTableDataSource<TaskResponse>();
    selection = new SelectionModel<TaskResponse>(true, []);
    classApplied = false;
    users: User[] = []; // List of Users
    ouvriers: User[] = []; // List of Ouvriers (Users with role OUVRIER)
    selectedUserIds!: number; // List of selected User IDs
    statusoptions = Object.values(TaskStatus); // List of TaskStatus values
    task: TaskRequest = {
        title: '',
        description: '',
        assignedToId: 3,
        assignedById: 2, // Assuming assignedTo is a User with roles
        dueDate: new Date(),
    };

    constructor(
        public themeService: CustomizerSettingsService,private dialog: MatDialog,
        private taskService: TaskService,private userService: UserService // Set minDate to today

    ) { this.minDate = new Date();}

    ngOnInit(): void {
        this.fetchTasks();
        this.fetchOuvriers(); // Fetch Ouvriers for the assignedTo dropdown
        this.dataSource.filterPredicate = (data: TaskResponse, filter: string) => {
            const lowerCaseFilter = filter.trim().toLowerCase();
            
            // Convert status to string (handle undefined case)
            const statusText = data.status ? data.status.toString().toLowerCase() : '';
    
            return data.title.toLowerCase().includes(lowerCaseFilter) || 
                   statusText.includes(lowerCaseFilter);
                };
    }

    fetchTasks() {
        this.taskService.getAllTasks().subscribe((tasks) => {
            console.log(tasks);
            this.dataSource.data = tasks;
            this.dataSource.paginator = this.paginator; // <-- Connect the paginator

        });
    }
    fetchOuvriers(): void {
        // Fetch users with the role OUVRIER
        this.userService.getOuvriers().subscribe(
            (users) => {
                this.ouvriers = users;
                console.log(users) // Assign the fetched users to the ouvriers array
            },
            (error) => {
                console.error('Error fetching Ouvriers:', error);
            }
        );
    
    }
    applyFilter(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement) {
            this.dataSource.filter = inputElement.value.trim().toLowerCase();
        }
    }
    addTask(task: TaskRequest): void 
    {console.log(task);
        this.taskService.createTask(task).subscribe(() => {
            console.log(task)
            this.fetchTasks(); // Refresh the task list
            this.toggleClass(); // Close the popup
            this.resetTaskForm(); // Reset the form
        });
      }
      updateTask(task: TaskResponse): void {
        this.selectedTaskId = task.id;  // Save the task ID

        this.isEditMode = true; // Set edit mode to true
        this.task = {
            title: task.title,
            description: task.description,
            status: task.status, // Assuming task.status is a string or convert it accordingly
            dueDate: new Date(task.dueDate),
            assignedById:  1,  // or a default value / prompt user
            assignedToId:  2   // or a default value / prompt user
        };    this.toggleClass(); 
        console.log(this.task)
    }
    saveUpdatedTask(): void {
        if (this.selectedTaskId) {

    this.taskService.updateTask(this.selectedTaskId,this.task).subscribe(() => {
        this.fetchTasks(); // Refresh task list
        this.toggleClass(); // Close popup
        this.resetTaskForm(); // Reset form
    });
}
}
    deleteTask(taskId: number): void {
        this.taskService.deleteTask(taskId).subscribe(() => {
          this.fetchTasks(); // Refresh the task list
        });
      }  
      resetTaskForm(): void {
        this.task = {
            title: '',
            description: '',
            assignedToId: 1,
            assignedById: 2,
            dueDate: new Date(),
            status: TaskStatus.PENDING, // Use the TaskStatus enum
        };
    }
    isFormValid(): boolean {
        return  !!(this.task.title && this.task.title.length >= 3 &&
               this.task.description &&
               this.task.assignedToId &&
               this.task.dueDate &&
               this.task.status);
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }
    onDateChange(event: any): void {
        if (!event.value) return;

    const selectedDate = event.value;
    
    // Extract only the YYYY-MM-DD part (removing timezone offsets)
// Extract local YYYY-MM-DD without timezone conversion
const year = selectedDate.getFullYear();
const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); 
const day = String(selectedDate.getDate()).padStart(2, '0'); 

// Store as a string
this.task.dueDate = `${year}-${month}-${day}`;    console.log(this.task.dueDate);
      }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: TaskResponse): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    

    /** Toggle class for styling */
    toggleClass() {
        this.classApplied = !this.classApplied;
        if (!this.classApplied) {
            this.isEditMode = false; // Reset edit mode
            this.resetTaskForm(); // Reset the form
        }
    }

    openCommentsDialog(task: any): void {
        this.dialog.open(TaskCommentsDialogComponent, {
          width: '600px',
          data: { task: task }
        });
      }
}

