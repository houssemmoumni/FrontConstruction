
import { RoleType } from './role-type';
export interface SignUpRequest {
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    role: RoleType;
}
