export interface ApplicationDTO {
    id: number;
    candidate: {
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
