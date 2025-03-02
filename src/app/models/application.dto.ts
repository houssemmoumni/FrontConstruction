export interface ApplicationDTO {
    id: number;
    candidate: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      address: string;
    };
    jobOffer: {
      title: string;
    };
    status: string;
    resume: string; // Base64-encoded resume
  }
