export interface IncidentNotification {
    id: number; // Changed from optional to required if IDs are always present
    message: string;
    notificationDate: string;
    isRead: boolean;
    receiverId: number;
    incidentId?: number;
  }