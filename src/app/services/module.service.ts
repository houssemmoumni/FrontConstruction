import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../models/module.model';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private apiUrl = 'http://localhost:8095/Communication_Service'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Ajouter un module à un cours (sans vidéo)
  addModuleToCourse(courseId: number, module: Module): Observable<Module> {
    return this.http.post<Module>(`${this.apiUrl}/api/modules/add/${courseId}`, module);
  }

  // Ajouter une vidéo à un module existant
  addVideoToModule(moduleId: number, videoFile: File): Observable<Module> {
    const formData = new FormData();
    formData.append('videoFile', videoFile);
    return this.http.post<Module>(`${this.apiUrl}/api/modules/add/${moduleId}/video`, formData);
  }

  // Supprimer un module
  removeModuleFromCourse(moduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/modules/remove/${moduleId}`);
  }

  // Récupérer tous les modules d'un cours
  getModulesByCourseId(courseId: number): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/api/modules/course/${courseId}`);
  }

  // Mettre à jour un module
  updateModule(moduleId: number, module: Module): Observable<Module> {
    return this.http.put<Module>(`${this.apiUrl}/api/modules/update/${moduleId}`, module);
  }

  // Récupérer un module par son ID
  getModuleById(moduleId: number): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/api/modules/${moduleId}`);
  }
}
