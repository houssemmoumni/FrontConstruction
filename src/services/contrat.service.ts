import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { contrat } from '../models/contrat.model';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContratService {
    private apiUrl = 'http://localhost:8222/api/assurance/contrats';

    constructor(private httpClient: HttpClient) {}

    public createContrat(contrat: contrat): Observable<contrat> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        console.log('Formatted contrat data:', contrat);

        return this.httpClient.post<contrat>(
            `${this.apiUrl}`, 
            contrat, 
            { headers }
        ).pipe(
            tap(response => console.log('Server response:', response)),
            catchError(this.handleError)
        );
    }

    public getAllContrats(): Observable<contrat[]> {
        console.log('Fetching contrats...');
        return this.httpClient.get<contrat[]>(`${this.apiUrl}`).pipe(
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

    public deleteContrat(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    public getContratById(id: number): Observable<contrat> {
        return this.httpClient.get<contrat>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    public updateContrat(id: number, contrat: contrat): Observable<contrat> {
        return this.httpClient.put<contrat>(`${this.apiUrl}/${id}`, contrat).pipe(
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
