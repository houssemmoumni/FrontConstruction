export enum StatutProjet {
    PLANIFICATION = "PLANIFICATION",
    EN_COURS = "EN_COURS",
    TERMINÉ = "TERMINÉ",
    ANNULE = "ANNULE"
}

export interface project { // Renamed from `project` to `Project`
    projet_id?: number;
    projet_name: string;
    projet_description?: string;
    start_date: string;
    end_date?: string | null;
    projectManager: string;
    statut_projet: StatutProjet;
    budget_estime: number;
    risque_retard: number;
    workers?: Worker[]; // Made optional
    latitude: number | null;
    longitude: number | null;
}

export interface Worker {
    worker_id?: number;
    name: string;
    role: string;
    project?: project; // Updated reference to `Project`
}

export interface ProjectDTO {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string | null;
}
