import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Interview } from '../models/interview.model';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private apiUrl = 'http://localhost:8060/api/interviews';

  constructor(private http: HttpClient) {}

  // Récupérer un entretien par son ID
  getInterviewById(id: number): Observable<Interview> {
    console.log(`🔎 Requête API : GET ${this.apiUrl}/${id}`);
    return this.http.get<Interview>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Erreur lors de la récupération de l\'entretien :', error);
        return throwError(() => new Error('Erreur lors de la récupération de l\'entretien.'));
      })
    );
  }
}
