import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChargeRequest } from '../models/charge-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8090/api/v1/payments/charge';

  constructor(private http: HttpClient) { }

  createPayment(charge: ChargeRequest): Observable<any> {
        
        return this.http.post<any>(`${this.apiUrl}`, charge);
      }
}
