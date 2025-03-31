// src/app/services/interview.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../models/interview.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private apiUrl = 'http://localhost:8060/api/interviews';

  constructor(private http: HttpClient) {}

  // Récupère les entretiens par ID de candidature
  getInterviewsByApplicationId(applicationId: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(`${this.apiUrl}/application/${applicationId}`);
  }
}
