// chatbot.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8093/Communication_Service/api/chatbot';

  constructor(private http: HttpClient) { }

  askQuestion(question: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/ask`,
      { question },
      { responseType: 'json' }
    ).pipe(
      catchError((error: any) => {
        console.error('Erreur API:', error);
        return of({ response: "Désolé, le service est temporairement indisponible" });
      })
    );
  }

  askReclamationQuestion(question: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reclamation-help`, { userQuery: question });
  }
}
