import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { projet } from '../models/projet.model';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjetService {
    private apiUrl = 'http://localhost:8030/api/projets';

    constructor(private httpClient: HttpClient) {}

    public getAllProjets(): Observable<projet[]> {
        console.log('Fetching projets...');
        return this.httpClient.get<projet[]>(`${this.apiUrl}`).pipe(
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
