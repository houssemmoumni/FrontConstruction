
import { RoleType } from './role-type';
export interface Role {
    roleId: number;
    nomRole: RoleType;
    permissions: string[];
    users?: number[]; // Contient les ID des utilisateurs associés (optionnel pour éviter la surcharge)
  }