import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NegociationService {

  private baseUrl = 'http://localhost:8066/api/negociations';

  constructor(private http: HttpClient) { }

  getNegociationById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/${id}/phases`).pipe(
      catchError(this.handleError)
    );
  }

  updateNegociation(id: string, negociation: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, negociation).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof Error) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
