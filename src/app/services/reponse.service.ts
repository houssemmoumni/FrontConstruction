import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reponse } from '../models/reponse.model';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReponseService {
  private apiUrl = 'http://localhost:8093/Communication_Service/api/responses'; // URL de votre API

  constructor(private http: HttpClient) {}



  getReponsesByReclamation(reclamationId: number): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`http://localhost:8093/Communication_Service/api/responses/reclamation/${reclamationId}`);
  }



// Ajouter une réponse
addReponse(reponse: { titre: string; reponse: string }, reclamationId: number, userId: number): Observable<Reponse> {
    const url = `${this.apiUrl}/addResponse?reclamationId=${reclamationId}&userId=${userId}`;
    return this.http.post<Reponse>(url, reponse).pipe(
      retry(2) // Optionnel: permet de réessayer en cas d'échec
    );
  }

  // Supprimer une réponse
  deleteReponse(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}/${userId}`);
  }

  // Récupérer toutes les réponses
  getAllReponses(): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`${this.apiUrl}/all`);
  }

  // Récupérer une réponse par ID
  getReponseById(id: number): Observable<Reponse> {
    return this.http.get<Reponse>(`${this.apiUrl}/${id}`);
  }


  // Dans reponse.service.ts

// Mettre à jour une réponse
updateReponse(id: number, reponse: { reponse: string }, userId: number): Observable<Reponse> {
    return this.http.put<Reponse>(
      `${this.apiUrl}/update/${id}?userId=${userId}`,
      reponse
    ).pipe(
      retry(2),
      catchError(error => {
        console.error('Erreur de mise à jour:', error);
        let errorMessage = 'Une erreur est survenue';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        throw new Error(errorMessage);
      })
    );
  }
}
