import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revenue } from '../models/revenue.model';
import { ProjectDTO } from '../models/project.model'; // Import ProjectDTO model
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  private apiUrl = 'http://localhost:8045/api/revenues';

  constructor(private http: HttpClient) {}

  getAllRevenues(): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(this.apiUrl);
  }

  getRevenueById(id: number): Observable<Revenue> {
    return this.http.get<Revenue>(`${this.apiUrl}/${id}`);
  }

  createRevenue(revenue: Revenue): Observable<Revenue> {
    return this.http.post<Revenue>(this.apiUrl, revenue);
  }

  updateRevenue(id: number, revenue: Revenue): Observable<Revenue> {
    return this.http.put<Revenue>(`${this.apiUrl}/${id}`, revenue);
  }

  deleteRevenue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getExternalProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(`${this.apiUrl}/external-projects`).pipe(
        catchError(error => {
            console.error('Error fetching external projects:', error);
            return throwError(error);
        })
    );
  }

  getTotalRevenue(): Observable<number> {
    return this.http.get<Revenue[]>(this.apiUrl).pipe(
        map(revenues => revenues.reduce((total, revenue) => total + revenue.amount, 0))
    );
  }

  getAverageRevenue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average`);
  }
}
