import { contrat } from './contrat.model';

export interface maintenance {
    id?: number;
    title: string;
    description: string;
    image: string;
    email: string;
    contrat: contrat;
    status: string;
}