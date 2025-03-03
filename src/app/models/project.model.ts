export enum StatutProjet {
    PLANIFICATION = "PLANIFICATION",
    EN_COURS = "EN_COURS",
    TERMINÉ = "TERMINÉ",
    ANNULE = "ANNULE"
}

export interface project {
    projet_id?: number;
    projet_name: string;
    projet_description?: string;
    start_date: string;
    end_date?: string | null;
    projectManager: string;
    statut_projet: StatutProjet;
    budget_estime: number;
    risque_retard: number;
    workers: Worker[];
    latitude: number | null;
    longitude: number | null;
}

export interface Worker {
    worker_id?: number;
    name: string;
    role: string;
    project?: project;
}