export interface ApplicationDTO {
    id: number;
    candidate: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
    jobOffer: {
      title: string;
    };
    status: string;
    resume: string;
    interviewPassed?: boolean;
}
