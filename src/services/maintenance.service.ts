import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { maintenance } from '../models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:8030/api/maintenances'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getAllMaintenances(): Observable<maintenance[]> {
    return this.http.get<maintenance[]>(this.apiUrl);
  }

  getMaintenanceById(id: number): Observable<maintenance> {
    return this.http.get<maintenance>(`${this.apiUrl}/${id}`);
  }

  createMaintenance(maintenance: maintenance): Observable<maintenance> {
    return this.http.post<maintenance>(this.apiUrl, maintenance);
  }

  updateMaintenance(id: number, maintenance: maintenance): Observable<maintenance> {
    return this.http.put<maintenance>(`${this.apiUrl}/${id}`, maintenance);
  }

  deleteMaintenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}