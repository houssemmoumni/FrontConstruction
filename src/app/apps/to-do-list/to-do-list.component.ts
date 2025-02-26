import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Add this import
import { CommonModule } from '@angular/common'; // <-- Add this import

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
@Component({
    selector: 'app-to-do-list',
    imports: [    CommonModule, // <-- Add this line
        MatCardModule, MatMenuModule, MatButtonModule, RouterLink,    FormsModule, // <-- Add this line
        MatTableModule, NgIf, MatCheckboxModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
    templateUrl: './to-do-list.component.html',
    styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit{
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
        assignedToId: 1,
        assignedById: 2, // Assuming assignedTo is a User with roles
        dueDate: new Date(),
    };

    constructor(
        public themeService: CustomizerSettingsService,
        private taskService: TaskService,private userService: UserService // Set minDate to today

    ) { this.minDate = new Date();}

    ngOnInit(): void {
        this.fetchTasks();
        this.fetchOuvriers(); // Fetch Ouvriers for the assignedTo dropdown

    }

    fetchTasks() {
        this.taskService.getAllTasks().subscribe((tasks) => {
            console.log(tasks);
            this.dataSource.data = tasks;
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
    addTask(task: TaskRequest): void 
    {console.log(task);
        this.taskService.createTask(task).subscribe(() => {
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
    this.task.dueDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: TaskResponse): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    /** Apply search filter */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    /** Toggle class for styling */
    toggleClass() {
        this.classApplied = !this.classApplied;
        if (!this.classApplied) {
            this.isEditMode = false; // Reset edit mode
            this.resetTaskForm(); // Reset the form
        }
    }
}

