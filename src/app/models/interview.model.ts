export interface Interview {
    id: number;
    applicationId: number;
    interviewDate: string;
    interviewTime: string;
    meetLink: string;
    feedback: string;
    token: string;
    linkActive: boolean;
    completed: boolean;
    passed: boolean;
}

export interface CompletedInterview {
    id: number;
    applicationId: number;
    interviewDate: string;
    candidateName: string;
    jobTitle: string;
}
