export interface Notification {
    id: number;
    created_at: string;
    message: string;
    is_read: boolean;
    type: string;
    interview_id?: number;
    application_id: number;
    meetLink?: string;
  }
