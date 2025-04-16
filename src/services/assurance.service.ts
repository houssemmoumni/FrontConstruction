import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { assurance } from '../models/assurance.model';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  api = 'http://localhost:8222/api/assurance/assurances';

  constructor(private httpClient: HttpClient) {}

  public createAssurance(assurance: assurance): Observable<assurance> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log('Formatted assurance data:', assurance);

    return this.httpClient.post<assurance>(
      `${this.api}`, 
      assurance, 
      { headers }
    ).pipe(
      tap(response => console.log('Server response:', response)),
      catchError(this.handleError)
    );
  }

  public getAllAssurances(): Observable<assurance[]> {
    console.log('Fetching assurances...');
    return this.httpClient.get<assurance[]>(`${this.api}`).pipe(
      tap(response => {
        console.log('Raw API response:', response);
      }),
      map(response => {
        if (!response) return [];
        // Handle both array and object responses
        return Array.isArray(response) ? response : [response];
      }),
      catchError(this.handleError)
    );
  }

  public deleteAssurance(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public getAssuranceById(id: number): Observable<assurance> {
    return this.httpClient.get<assurance>(`${this.api}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public updateAssurance(id: number, assurance: assurance): Observable<assurance> {
    return this.httpClient.put<assurance>(`${this.api}/${id}`, assurance).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}