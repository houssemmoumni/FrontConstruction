export interface User {
    id: number;
    username: string;
    email: string;
    role: 'ADMIN' | 'TECHNICIEN' | 'OUVRIER';
  }

  export interface IncidentForm {
    description: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    projectId: number;
    reporterName: string;
    projectName: string;
  }

  export interface IncidentReport {
    id: number;
    name: string;
    description: string;
    reportDate: string;
    status: 'DECLARED' | 'ASSIGNED' | 'RESOLVED' | 'REOPENED';
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    reporterName?: string;
    reportedBy?: User;
    assignedTo?: User;
    projectId: number;
    projectName?: string; // À ajouter si possible
    project?: {         // Optionnel - si vous voulez l'objet complet
      id: number;
      name: string;
      location?: string;
    };
  }

  export interface AssignIncidentRequest {
    technicianId: number;
    adminId: number;
    comments: string;
  }

  export interface Notification {
    id: number;
    message: string;
    notification_date: string;
    is_read: boolean;
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    receiverId: number;
    incident?: IncidentReport;
    incidentReport?: IncidentReport;
    source: 'incident' | 'incidentReport';
  }

  export interface Project {
    id?: number;
    name: string;
    location: string;
    description?: string;
    published: boolean;
    image?: string | null;
  }
