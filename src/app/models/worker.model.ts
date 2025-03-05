export enum Role {
    ADMIN = 'ADMIN',
    CHEF_PROJET = 'CHEF_PROJET',
    DEVELOPPEUR = 'DEVELOPPEUR',
    TESTEUR = 'TESTEUR',
    CLIENT = 'CLIENT'
}

export interface Worker {
    id?: number;
    name: string;
    role: Role;
    email: string;
    phone: string;
    joindate: string;
}

export type WorkerFormData = Omit<Worker, 'id' | 'project'>;
