// src/app/models/notification.model.ts
export interface Notification {
    id: number;
    type: string; // 'success', 'error', etc.
    message: string;
    is_read: boolean;
    created_at: string;
    interview_id?: number; // Lien vers l'entretien (optionnel)
  }
