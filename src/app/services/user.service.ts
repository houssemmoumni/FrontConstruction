import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8051/api/v1/users'; // Adjust the API URL as needed


  constructor(private http: HttpClient) { }
   // Fetch users with the OUVRIER role
   getOuvriers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/ouvriers`);
  }
}
