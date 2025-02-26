import { Role } from '../../app/models/role';
import { Task } from '../../app/models/task';
export interface User {
    id: number;
    username: string;
    password: string;
    roles: Role[];
    tasks: Task[];
    tasksAssignedTo: Task[];
}
