import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationDTO } from '../models/application.dto';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = 'http://localhost:8060/api/applications';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les candidatures
  getAllApplications(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(this.apiUrl);
  }

  // Mettre à jour le statut d'une candidature
  updateApplicationStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }
}
