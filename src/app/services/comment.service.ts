import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8050/api/v1/comments'; // Replace with your backend URL


  constructor(private http: HttpClient) { }
  getCommentsForTask(taskId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?taskId=${taskId}`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }
}
