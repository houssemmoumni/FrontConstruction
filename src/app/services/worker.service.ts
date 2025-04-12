import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Worker } from '../models/worker.model';
import { project } from '../models/project.model';
import { ProjectManagementService } from './project-management.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private apiUrl = 'http://localhost:8222';  // Verify this URL is correct

  constructor(
    private http: HttpClient,
    private projectService: ProjectManagementService,
    private router: Router
  ) { }

  getAllWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.apiUrl}/workers`).pipe(
      tap(workers => {
        console.log('Raw worker data:', workers);
        workers.forEach(worker => {
          console.log(`Worker ${worker.name} project status:`, {
            project_id: worker.project_id,
            currentProject: worker.currentProject
          });
        });
      })
    );
  }

  getWorkerById(id: number): Observable<Worker> {
    return this.http.get<Worker>(`${this.apiUrl}/workers/${id}`);
  }

  createWorker(worker: Omit<Worker, 'id'>): Observable<Worker> {
    return this.http.post<Worker>(`${this.apiUrl}/workers`, worker);
  }

  deleteWorker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/workers/${id}`);
  }

  updateWorker(worker: Worker): Observable<Worker> {
    return this.http.put<Worker>(`${this.apiUrl}/workers/${worker.id}`, worker).pipe(
      catchError(error => {
        console.error('Error updating worker:', error);
        return throwError(() => new Error('Failed to update worker'));
      })
    );
  }

  assignWorkerToProject(workerId: number, project_id: number): Observable<Worker> {
    return this.http.put<Worker>(
      `${this.apiUrl}/workers/${workerId}/assign/${project_id}`,
      {}
    ).pipe(
      tap(() => {
        // Navigate to projects list after successful assignment
        this.router.navigate(['/project-management-page/projects-list']);
      })
    );
  }

  removeWorkerFromProject(workerId: number): Observable<Worker> {
    return this.http.put<Worker>(
      `${this.apiUrl}/workers/${workerId}/removeProject`,
      {}
    ).pipe(
      catchError(error => {
        console.error('Error removing worker from project:', error);
        return throwError(() => new Error('Failed to remove worker from project'));
      })
    );
  }

  getAvailableProjects(): Observable<project[]> {
    return this.projectService.getAllProjects();
  }
}
