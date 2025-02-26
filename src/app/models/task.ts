import { TaskStatus } from './task-status';
import { User } from './user';
export interface Task {
    id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  assignedBy: User;
  assignedTo: User;
}
