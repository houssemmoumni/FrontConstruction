import { User } from './user';
import { Task } from './task';
export interface Comment {
    id: number;
    text: string;
    createdAt: string;
    author: User;  // Instead of just authorId, include the full user object
    task: Task;    // Instead of just taskId, include the full task ob
}
