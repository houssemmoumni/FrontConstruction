import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from '../models/job-offer.model';

@Injectable({
  providedIn: 'root',
})
export class JobOfferService {
  private apiUrl = 'http://localhost:8060/api/job-offers';

  constructor(private http: HttpClient) {}

  // Publier une offre d'emploi
  publishJobOffer(id: number): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${this.apiUrl}/${id}/publish`, {});
  }

  // Récupérer toutes les offres d'emploi
  getJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.apiUrl);
  }

  // Récupérer une offre par ID
  getJobOfferById(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une offre
  addJobOffer(jobOffer: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(this.apiUrl, jobOffer);
  }

  // Mettre à jour une offre
  updateJobOffer(id: number, jobOffer: JobOffer): Observable<JobOffer> {
    return this.http.put<JobOffer>(`${this.apiUrl}/${id}`, jobOffer);
  }

  // Supprimer une offre
  deleteJobOffer(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les offres publiées
  getPublishedJobOffers(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${this.apiUrl}/published`);
  }
}
