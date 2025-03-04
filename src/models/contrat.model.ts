import { assurance } from './assurance.model';
import { projet } from './projet.model';

export interface contrat {
    id?: number;
    contratcondition: string;
    date_signature: string;
    date_expiration: string;
    assurance: assurance;
    projet: projet;
}
