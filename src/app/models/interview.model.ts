export interface Interview {
    id: number;
    applicationId: number;
    interviewDate: string; // ISO format (YYYY-MM-DD)
    interviewTime: string; // HH:mm format
    meetLink: string;
    feedback: string;
    token: string;
    linkActive: boolean;
  }
