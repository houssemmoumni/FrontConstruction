// src/app/models/interview.model.ts
export interface Interview {
    id: number;
    interviewDate: string; // Ou utilisez `Date` si vous convertissez les dates
    feedback: string;
    application: {
      id: number;
      // Ajoutez d'autres propriétés de l'application si nécessaire
    };
  }
