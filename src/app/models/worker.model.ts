import { project } from "./project.model";

export enum Role {
    ADMIN = 'ADMIN',
    CHEF_PROJET = 'CHEF_PROJET',
    DEVELOPPEUR = 'DEVELOPPEUR',
    TESTEUR = 'TESTEUR',
    CLIENT = 'CLIENT'
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
