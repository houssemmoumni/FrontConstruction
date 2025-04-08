// src/app/pages/lms-page/l-course-details/course-sales/course-sales.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseSalesService {
  private apiUrl = 'http://localhost:8095/Communication_Service/api/courses'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Récupérer les statistiques de cours publiés vs non publiés
  getPublishedVsUnpublishedStats(): Observable<{ published: number; unpublished: number }> {
    return this.http.get<{ published: number; unpublished: number }>(
      `${this.apiUrl}/stats/published-vs-unpublished`
    );
  }

  // Charger le graphique (optionnel, si vous utilisez une bibliothèque de graphiques)
  loadChart(): void {
    // Implémentez la logique pour charger le graphique ici
  }
}