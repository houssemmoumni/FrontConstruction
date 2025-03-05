import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpRequest } from '../models/sign-up-request';
import { SignInRequest } from '../models/sign-in-request';
import { SignupResponse } from '../models/signup-response';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private apiUrl = 'http://localhost:8082/api/auth';
  constructor(private http: HttpClient) { }

  
  // Modèle pour l'inscription
  signUp(signUpData: SignUpRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, signUpData);
  }

  // Modèle pour l'authentification
  signIn(signInData: SignInRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signin`, signInData, {
      responseType: 'json' // Assurez-vous que le backend renvoie bien un JSON
    });
  }
}

  

