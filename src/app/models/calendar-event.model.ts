import { Worker } from './worker.model';

export interface CalendarEvent {
    id?: number;
    title: string;
    date: string;
    projet_id?: number;
    workers?: Worker[];
    projet_name?: string;
}
