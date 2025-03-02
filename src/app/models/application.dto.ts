export interface ApplicationDTO {
    id: number; // Corresponds to Long in Java
    candidateFullName: string;
    candidateEmail: string;
    jobOfferTitle: string;
    status: string;
    resume: string | null; // Base64-encoded resume (or null if no resume)
  }
