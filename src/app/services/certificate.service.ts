import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private apiUrl = 'http://localhost:8095/Communication_Service/api/certificates'; // Remplacez par votre URL API

  constructor(private http: HttpClient) {}

  // Méthode pour générer et télécharger le certificat
  generateCertificate(userCourseId: number): Observable<Blob> {
    const url = `${this.apiUrl}/generate`;
    const params = new HttpParams().set('userCourseId', userCourseId.toString());
    return this.http.post(url, {}, { params, responseType: 'blob' }); // Corps vide, les paramètres sont dans l'URL
  }
}
