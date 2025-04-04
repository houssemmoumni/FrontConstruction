import { TaskStatus } from "./task-status";

export interface TaskRequest {
    title: string; // Title of the task
    description: string; // Description of the task
    status?: TaskStatus; // Status of the task (e.g., PENDING, IN_PROGRESS, COMPLETED)
    dueDate: Date | string; // Due date of the task
    assignedById: number; // ID of the user who assigned the task
    assignedToId: number; // ID of the user to whom the task is assigned
}