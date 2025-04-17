import { Component, OnInit  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
    CdkDragDrop,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { TaskResponse } from '../../models/task-response';
import { TaskStatus } from '../../models/task-status';
import { TaskRequest } from '../../models/task-request';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { TaskCommentsDialogComponent } from '../../../app/task-comments-dialog/task-comments-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';







@Component({
    selector: 'app-kanban-board',
    standalone: true,
    imports: [
        RouterLink,
        CommonModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        DragDropModule,

        NgIf,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule
    ],
    templateUrl: './kanban-board.component.html',
    styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent implements OnInit {
    toDo: TaskResponse[] = [];
inProgress: TaskResponse[] = [];
completed: TaskResponse[] = [];
    staticUserId: number = 3; // Replace with dynamic ID when user module is ready


    ngOnInit(): void {
        this.fetchTasks();

    }
    fetchTasks(): void {
        this.taskService.getAllTasksByUser(this.staticUserId).subscribe(tasks => {
          this.toDo = tasks.filter(task => task.status === 'PENDING');
          this.inProgress = tasks.filter(task => task.status === 'IN_PROGRESS');
          this.completed = tasks.filter(task => task.status === 'COMPLETED');
        });
      }
       // Update columns with fetched tasks
    updateTaskColumns(tasks: any[]): void {
        tasks.forEach(task => {
            switch (task.status) {
                case 'To Do':
                    this.toDo.push(task);
                    break;
                case 'In Progress':
                    this.inProgress.push(task);
                    break;
                case 'Completed':
                    this.completed.push(task);
                    break;
                default:
                    break;
            }
        });
    }


    // Drag and Drop
    drop(event: CdkDragDrop<TaskResponse[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        // Update task status based on the new column
        const task = event.container.data[event.currentIndex];
        let newStatus: TaskStatus;

        if (event.container.id === 'toDoList') {
            newStatus = TaskStatus.PENDING;
        } else if (event.container.id === 'inProgressList') {
            newStatus = TaskStatus.IN_PROGRESS;
        } else if (event.container.id === 'completedList') {
            newStatus = TaskStatus.COMPLETED;
        } else {
            return; // Unknown column, don't update
        }

        // Create proper TaskRequest object
        const updateData: TaskRequest = {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            assignedById: Number(task.assignedBy),  // Convert string to number
            assignedToId: Number(task.assignedTo),  // Convert string to number
            status: newStatus
        };

        // Update task in backend
        this.taskService.updateTask(task.id, updateData).subscribe({
            next: () => {
                // Update local task status only after successful API call
                task.status = newStatus;
            },
            error: (err) => {
                console.error('Failed to update task:', err);
                // Revert the UI change if the API call fails
                transferArrayItem(
                    event.container.data,
                    event.previousContainer.data,
                    event.currentIndex,
                    event.previousIndex
                );
            }
        });
    }
}

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }
    openCommentsDialog(task: any): void {
        this.dialog.open(TaskCommentsDialogComponent, {
          width: '600px',
          data: { task: task }
        });
      }

    constructor(
        public themeService: CustomizerSettingsService,private taskService: TaskService,    private dialog: MatDialog

    ) {}

}
