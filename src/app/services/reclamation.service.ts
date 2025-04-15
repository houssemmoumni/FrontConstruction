import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../../app/models/reclamation.model';
import { Reponse } from '../models/reponse.model';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
    getReponsesByReclamation(reclamationId: number): Observable<Reponse[]> {
        return this.http.get<Reponse[]>(`http://localhost:8093/Communication_Service/api/responses/reclamation/${reclamationId}`);
      }

  private apiUrl = 'http://localhost:8093/Communication_Service/api/reclamations'; // Remplace avec l'URL correcte du backend


  constructor(private http: HttpClient) {}

  // Récupérer toutes les réclamations
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/all`);
  }

  // Récupérer une réclamation par ID
  getReclamationById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une réclamation
  addReclamation(reclamation: Reclamation, userId: number): Observable<Reclamation> {
    // Solution 1: Envoi comme form-data (pour la méthode avec @RequestParam)
    const formData = new FormData();
    formData.append('titre', reclamation.titre || '');
    formData.append('description', reclamation.description || '');
    formData.append('type', reclamation.type || '');

    return this.http.post<Reclamation>(
      `${this.apiUrl}/ajouter?userId=${userId}`,
      formData
    );

    // OU Solution 2: Envoi comme JSON (méthode recommandée)
    // return this.http.post<Reclamation>(
    //   `${this.apiUrl}/ajouter?userId=${userId}`,
    //   reclamation
    // );
  }

  // Modifier une réclamation
  updateReclamation(id: number, reclamation: Reclamation, userId: number): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/modifier/${id}?userId=${userId}`, reclamation);
  }

   // Supprimer une réclamation
   deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
  }


  getReclamationsByUser(id: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`http://localhost:8093/Communication_Service/api/reclamations/user/${id}`);
  }







}
