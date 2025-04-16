import { User } from './user.model';

export interface HistoriquePointage {
    id?: number;
    jour_pointage: string;  // "yyyy-MM-dd"
    temps_entree: string;   // "HH:mm"
    temps_sortie: string;
    localisation: string;
    user: User;             // Now properly typed with your User interface
    score?: number;
    temps_commencement: string;
    temps_finition: string;
}

// Simplified DTO for creation (only needs user ID)
export interface CreatePointageDto {
    jour_pointage: string;
    temps_entree: string;
    temps_sortie: string;
    localisation: string;
    user: { id: number };  // Only ID required for creation
    temps_commencement: string;
    temps_finition: string;
}