import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentResponse } from '../models/comment-response';
import { CommentRequest } from '../models/comment-request';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8222/api/comments'; // Note: Removed /v1 to match your Spring controller


  constructor(private http: HttpClient) { }
  getCommentsForTask(taskId: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${this.apiUrl}/task/${taskId}`);
  }

  addComment(taskId: number, text: string, authorId: number): Observable<CommentResponse> {
    const commentRequest = { taskId, text };
    return this.http.post<CommentResponse>(
      `${this.apiUrl}?authorId=${authorId}`, 
      commentRequest
    );
  }

  updateComment(commentId: number, comment: CommentRequest): Observable<CommentResponse> {
    return this.http.put<CommentResponse>(
      `${this.apiUrl}/${commentId}`,
      comment  // Assuming that's the only field you're updating
    );
  }
  
  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }

}
