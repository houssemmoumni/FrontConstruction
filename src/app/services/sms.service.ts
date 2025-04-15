import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  private apiUrl = 'http://localhost:8095/Communication_Service'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  sendSms(toPhoneNumber: string, message: string): Observable<any> {
    const url = `${this.apiUrl}/send-sms`;
    const params = { toPhoneNumber, message };
    return this.http.post(url, null, { params });
  }
}
