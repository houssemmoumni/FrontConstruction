
export interface Interview {
    id: number;
    applicationId: number;
    interviewDate: Date;
    feedback: string;
    status: 'scheduled' | 'completed' | 'canceled';
  }
