import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from '../models/worker.model';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private apiUrl = 'http://localhost:8040/workers';

  constructor(private http: HttpClient) { }

  getAllWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(this.apiUrl);
  }

  getWorkerById(id: number): Observable<Worker> {
    return this.http.get<Worker>(`${this.apiUrl}/${id}`);
  }

  createWorker(worker: Omit<Worker, 'id'>): Observable<Worker> {
    return this.http.post<Worker>(this.apiUrl, worker);
  }

  deleteWorker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignWorkerToProject(workerId: number, projectId: number): Observable<Worker> {
    return this.http.put<Worker>(`${this.apiUrl}/${workerId}/assign/${projectId}`, {});
  }
}
