import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { project } from '../models/project.model';
import { tap, catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface ApiError {
    message: string;
    status?: number;
    error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {
  private apiUrl = 'http://localhost:8040';
  private retryAttempts = 3;
  private retryDelay = 1000; // 1 second

  constructor(private http: HttpClient, private router: Router) {}

  public createProject(project: any): Observable<project> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Format data to match backend expectations exactly
    const formattedProject = {
        projet_name: String(project.projet_name).trim(),
        projet_description: String(project.projet_description || '').trim(),
        start_date: this.formatDateForBackend(project.start_date),
        end_date: project.end_date ? this.formatDateForBackend(project.end_date) : null,
        statut_projet: project.statut_projet || 'PLANIFICATION',
        projectManager: String(project.projectManager),
        budget_estime: this.parseNumber(project.budget_estime),
        risque_retard: this.parseNumber(project.risque_retard),
        latitude: this.parseNumber(project.latitude),
        longitude: this.parseNumber(project.longitude),
        workers: []
    };

    // Log the exact request being sent
    console.log('Request payload:', JSON.stringify(formattedProject, null, 2));

    return this.http.post<project>(`${this.apiUrl}/save/projects`, formattedProject, { headers }).pipe(
        tap(response => console.log('Success response:', response)),
        catchError(error => {
            console.error('Error details:', {
                status: error.status,
                message: error.error?.message,
                error: error.error
            });
            return throwError(() => ({
                message: error.error?.message || 'Failed to create project',
                status: error.status,
                error: error.error
            }));
        })
    );
  }

  private parseNumber(value: any): number {
    if (value === null || value === undefined || value === '') return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  }

  private formatDateForBackend(date: string | Date): string {
    if (!date) return new Date().toISOString().split('T')[0];
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
        return d.toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
  }

  public getAllProjects(): Observable<project[]> {
    // Change from /projets to /get/projects to match your backend endpoint
    return this.http.get<project[]>(`${this.apiUrl}/get/projects`).pipe(
      retry({
        count: this.retryAttempts,
        delay: this.retryDelay
      }),
      map(response => {
        if (!response) return [];
        return Array.isArray(response) ? response : [response];
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error details:', error);
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      if (error.status === 404) {
        errorMessage = `API endpoint not found. Please check if the URL /get/projects is correct`;
      } else if (error.status === 0) {
        errorMessage = 'Server connection failed. Please check if the server is running.';
      } else {
        errorMessage = `Server error: ${error.status}\nMessage: ${error.message}`;
      }
    }

    console.log('Error message:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  isProjectActive(project: project): boolean {
    const today = new Date();
    const startDate = new Date(project.start_date);
    const endDate = project.end_date ? new Date(project.end_date) : null;
    
    return startDate <= today && (!endDate || today <= endDate);
  }

  getActiveProjects(): Observable<project[]> {
    return this.getAllProjects().pipe(
      map(projects => projects.filter(project => this.isProjectActive(project)))
    );
  }

  isProjectCompleted(project: project): boolean {
    if (!project.end_date) return false;
    const today = new Date();
    const endDate = new Date(project.end_date);
    return endDate < today;
  }

  getCompletedProjects(): Observable<project[]> {
    return this.getAllProjects().pipe(
      map(projects => projects.filter(project => this.isProjectCompleted(project)))
    );
  }

  public deleteProject(projet_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/projects/${projet_id}`);
  }

  public getProjectById(projet_id: number): Observable<project> {
    return this.http.get<project>(`${this.apiUrl}/get/projects/${projet_id}`);
  }

  public updateProject(id: number, project: any): Observable<project> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const formattedProject = {
        projet_id: id,
        projet_name: String(project.projet_name).trim(),
        projet_description: String(project.projet_description || '').trim(),
        start_date: this.formatDateForBackend(project.start_date),
        end_date: project.end_date ? this.formatDateForBackend(project.end_date) : null,
        statut_projet: project.statut_projet,
        projectManager: String(project.projectManager),
        budget_estime: this.parseNumber(project.budget_estime),
        risque_retard: this.parseNumber(project.risque_retard),
        latitude: this.parseNumber(project.latitude),
        longitude: this.parseNumber(project.longitude),
        workers: project.workers || []
    };

    console.log('Update payload:', formattedProject);

    return this.http.put<project>(`${this.apiUrl}/update/projects/${id}`, formattedProject, { headers }).pipe(
        tap(response => console.log('Update response:', response)),
        catchError(error => {
            console.error('Update error:', error);
            return throwError(() => ({
                message: error.error?.message || 'Failed to update project',
                status: error.status,
                error: error.error
            }));
        })
    );
  }

  public getProjectManagers(): string[] {
    return [
        'John Doe - Project Lead',
        'Sarah Smith - Senior Manager',
        'Mike Johnson - Technical Lead',
        'Emily Brown - Product Manager',
        'David Wilson - Engineering Manager'
    ];
  }

  assignWorkersToProject(projectId: number, workers: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects/${projectId}/workers`, workers).pipe(
        tap(() => {
            // Navigate to projects list after successful assignment
            this.router.navigate(['/project-management-page/projects-list']);
        }),
        catchError(error => {
            console.error('Error assigning workers:', error);
            return throwError(() => error);
        })
    );
  }
}