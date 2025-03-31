export interface ApplicationDTO {
    id: number;
    candidate: {
      id: number; // Ajoutez cette propriété
      firstName: string;
      lastName: string;
      email: string;
    };
    jobOffer: {
      title: string;
    };
    status: string;
    resume: string; // Base64 encoded PDF
  }
