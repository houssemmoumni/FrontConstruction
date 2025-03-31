// src/app/models/interview.model.ts
export interface Interview {
    id: number; // ID de l'entretien
    applicationId: number; // ID de la candidature associée
    interviewDate: string; // Date de l'entretien
    feedback: string; // Feedback de l'entretien
  }
