import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialRequest } from '../models/material-request';
import { MaterialResponse } from '../models/material-response';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:8050/api/v1/materials'; // Replace with your backend URL


  constructor(private http: HttpClient) { }

  createMaterial(userId: number, formData: FormData): Observable<number> {
    
    return this.http.post<number>(`${this.apiUrl}?userId=${userId}`, formData);
  }

  getMaterialById(materialId: number): Observable<MaterialResponse> {
    return this.http.get<MaterialResponse>(`${this.apiUrl}/${materialId}`);
  }

  getAllMaterials(): Observable<MaterialResponse[]> {
    return this.http.get<MaterialResponse[]>(this.apiUrl);
  }

  updateMaterial(
    userId: number,
    materialId: number,
    request: MaterialRequest
  ): Observable<MaterialResponse> {
    return this.http.put<MaterialResponse>(
      `${this.apiUrl}/${materialId}?userId=${userId}`,
      request
    );
  }

  deleteMaterial(userId: number, materialId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${materialId}?userId=${userId}`
    );
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
}
purchaseMaterials(purchaseRequests: { materialId: number; quantity: number }[]) {
  return this.http.post('/api/purchase', purchaseRequests);
}
}
