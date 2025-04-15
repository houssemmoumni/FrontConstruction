    import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Blog, BlogComment } from '../../app/models/blog.model'; // Assure-toi d'avoir un modèle Blog

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:8094/Communication_Service/blogs'; // URL de ton API Spring
  private apiUrl1 = 'http://localhost:8094/Communication_Service/blogs/ajouter';
  private apiUrl2 = 'http://localhost:8094/Communication_Service/comments/blog';
  private apiUrl3 = 'http://localhost:8094/Communication_Service/comments'; // Nouvelle URL pour

  constructor(private http: HttpClient) {}

  // Récupérer tous les blogs
  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  // Récupérer un blog par ID
  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un blog
  addBlog(formData: FormData): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl1, formData);
  }

  // Mettre à jour un blog
  updateBlog(blog: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}`, blog);
  }

  // Supprimer un blog
  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les commentaires d'un blog
  getComments(blogId: number) {
    return this.http.get<BlogComment[]>(`${this.apiUrl2}/${blogId}`);
  }

  // Ajouter un commentaire à un blog
  addComment(blogId: number, userId: number, content: string): Observable<BlogComment> {
    const url = `${this.apiUrl3}/${blogId}/${userId}`;
    const body = { content }; // Le corps de la requête
    return this.http.post<BlogComment>(url, body);
  }

  // Like a comment
  likeComment(commentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl3}/like/${commentId}`, {});
  }

  // Dislike a comment
  dislikeComment(commentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl3}/dislike/${commentId}`, {});
  }

  // Reply to a comment
  replyToComment(parentCommentId: number, replyContent: string): Observable<any> {
    const body = { content: replyContent };
    return this.http.post(`${this.apiUrl3}/reply/${parentCommentId}`, body);
  }
}
