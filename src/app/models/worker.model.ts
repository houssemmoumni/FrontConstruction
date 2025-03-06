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
    projectId?: number;      // Match backend naming
    currentProject?: project; // Match backend naming
}

export type WorkerFormData = Omit<Worker, 'id' | 'project'>;
