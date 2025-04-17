import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = 'http://localhost:8065/api/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getPublishedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/published`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createProject(projectData: Project, imageFile?: File): Observable<Project> {
    const formData = new FormData();
    formData.append('project', JSON.stringify({
      name: projectData.name,
      location: projectData.location,
      description: projectData.description,
      published: projectData.published || false
    }));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<Project>(this.apiUrl, formData);
  }

  updateProject(id: number, projectData: Project, imageFile?: File): Observable<Project> {
    const formData = new FormData();
    formData.append('project', JSON.stringify({
      name: projectData.name,
      location: projectData.location,
      description: projectData.description,
      published: projectData.published || false
    }));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<Project>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  publishProject(id: number): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${id}/publish`, {});
  }

  unpublishProject(id: number): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${id}/unpublish`, {});
  }
}
