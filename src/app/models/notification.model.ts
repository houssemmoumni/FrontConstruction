// src/app/models/notification.model.ts
export interface Notification {
    id: number; // ID de la notification
    type: string; // Type de notification (success, error, etc.)
    message: string; // Message de la notification
    applicationId: number; // ID de l'application associée
    interview_id?: number; // ID de l'entretien (optionnel) - updated to match API
    is_read: boolean; // Champ is_read de la base de données
}
