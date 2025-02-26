import { RoleType } from './role-type';
import { User } from '../../app/models/user';
export interface Role {
    id: number;
    name: RoleType;
    users: User[];
}
