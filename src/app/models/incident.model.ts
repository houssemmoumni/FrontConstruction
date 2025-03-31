// src/app/models/incident.model.ts
import { Project } from './project.model';

export interface IncidentForm {
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    projectId: number;
    reporterName: string;
}

export interface IncidentReport {
    id?: number;
    description: string;
    reportDate?: string;
    status?: 'DECLARED' | 'ASSIGNED' | 'RESOLVED' | 'REOPENED';
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    reporterName: string;
    projectId: number;
    assignedToId?: number;
}

export interface IncidentNotification {
    id?: number;
    message: string;
    notificationDate: string;
    isRead: boolean;
    receiverId: number;
    incidentId?: number;
}
