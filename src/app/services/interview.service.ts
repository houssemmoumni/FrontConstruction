// src/app/services/interview.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../models/interview.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private apiUrl = 'http://localhost:8060/api/interviews'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Récupérer un entretien par son ID
  getInterviewById(id: number): Observable<Interview> {
    return this.http.get<Interview>(`${this.apiUrl}/${id}`);
  }

  // Récupérer un entretien par l'ID de l'application
  getInterviewByApplicationId(applicationId: number): Observable<Interview> {
    return this.http.get<Interview>(`${this.apiUrl}/application/${applicationId}`);
  }
}
