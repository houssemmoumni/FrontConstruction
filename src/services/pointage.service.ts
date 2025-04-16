import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HistoriquePointage, CreatePointageDto } from '../models/pointage.model';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private apiUrl = 'http://localhost:8222/api/pointage/historique-pointages';

  constructor(private httpClient: HttpClient) {}

  getAllPointages(): Observable<HistoriquePointage[]> {
    return this.httpClient.get<HistoriquePointage[]>(this.apiUrl, { 
      withCredentials: true 
    }).pipe(
      tap(response => console.log('Fetched pointages:', response)),
      map(response => Array.isArray(response) ? response : [response]),
      catchError(this.handleError)
    );
  }

  getPointageById(id: number): Observable<HistoriquePointage> {
    return this.httpClient.get<HistoriquePointage>(`${this.apiUrl}/${id}`, { 
      withCredentials: true 
    }).pipe(
      catchError(this.handleError)
    );
  }

  createPointage(pointage: CreatePointageDto): Observable<HistoriquePointage> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    // Transform to match backend expectations
    const backendPayload = {
        ...pointage,
        user: { 
            id: pointage.user.id,
            telephone: 0,       // Default value (backend only needs ID)
            image: ''           // Default value (backend only needs ID)
        }
    };

    return this.httpClient.post<HistoriquePointage>(
        this.apiUrl,
        backendPayload,
        { headers, withCredentials: true }
    ).pipe(
        tap(response => console.log('Created pointage:', response)),
        catchError(this.handleError)
    );
}

updatePointage(id: number, pointage: HistoriquePointage): Observable<HistoriquePointage> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    // Ensure user object is properly structured for update
    const updatePayload = {
        ...pointage,
        user: {
            id: pointage.user.id,
            telephone: pointage.user.telephone || 0,
            image: pointage.user.image || ''
        }
    };

    return this.httpClient.put<HistoriquePointage>(
        `${this.apiUrl}/${id}`,
        updatePayload,
        { headers, withCredentials: true }
    ).pipe(
        tap(response => console.log('Updated pointage:', response)),
        catchError(this.handleError)
    );
}
  deletePointage(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.apiUrl}/${id}`,
      { withCredentials: true }
    ).pipe(
      catchError(this.handleError)
    );
  }

  downloadPointagePdf(id: number): Observable<Blob> {
    return this.httpClient.get(
      `${this.apiUrl}/${id}/download`, 
      {
        responseType: 'blob',
        withCredentials: true
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      // Specific error messages based on status code
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request - please check your data';
          break;
        case 401:
          errorMessage = 'Unauthorized - please login';
          break;
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 500:
          errorMessage = 'Server error - please try again later';
          break;
      }
    }
    
    console.error('Pointage Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}