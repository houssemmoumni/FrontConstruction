import { TaskStatus } from "./task-status";

export interface TaskResponse {
    id: number
    title: string; // Title of the task
    description: string; // Description of the task
    status?: TaskStatus; // Status of the task (e.g., PENDING, IN_PROGRESS, COMPLETED)
    dueDate: Date; // Due date of the task
    assignedBy: string; // ID of the user who assigned the task
    assignedTo: string; // ID of the user to whom the task is assigned
}