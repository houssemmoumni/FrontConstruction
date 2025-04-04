import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequest } from '../models/order-request';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8070/api/v1/orders';

  constructor(private http: HttpClient) { }

  createOrder(order: OrderRequest): Observable<number> {
      
      return this.http.post<number>(`${this.apiUrl}`, order);
    }
}
