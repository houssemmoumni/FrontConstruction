import { project } from "./project.model";

export enum Role {
    CHEF_CHANTIER = 'CHEF_CHANTIER',
    CONDUCTEUR_TRAVEAUX = 'CONDUCTEUR_TRAVEAUX',
    INGENIEUR = 'INGENIEUR',
    CONDUCTEUR_SECURITE = 'CONDUCTEUR_SECURITE',
    TECHNICIEN = 'TECHNICIEN'
}

export interface Worker {
    id: number;
    name: string;
    role: string;
    email: string;
    phone?: string;
    joindate: string;
    project_id?: number | null;    // Changed from projectId to project_id to match backend
    currentProject?: {
        projet_id: number;
        projet_name: string;
    } | null;
}

export type WorkerFormData = Omit<Worker, 'id' | 'project'>;
