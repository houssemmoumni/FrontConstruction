// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { UserCourse } from '../models/user-course.model'; // Importer le modèle UserCourse
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:8095/Communication_Service/api/courses'; // Remplacez par l'URL de votre backend
  private apiUrl1 = 'http://localhost:8095/Communication_Service/api';

  constructor(private http: HttpClient) {}

  // Récupérer tous les cours publiés
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un cours par son ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // Récupérer tous les cours publiés
  getAllPublishedCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/published`);
  }

  // Inscrire un utilisateur à un cours
  enrollUserInCourse(userId: number, courseId: number): Observable<any> {
    const url = `${this.apiUrl1}/user-courses/enroll?userId=${userId}&courseId=${courseId}`;
    return this.http.post(url, {}); // Corps vide car les paramètres sont dans l'URL
  }


 // Nouvelle méthode pour récupérer les étudiants inscrits à un cours
 getEnrolledStudents(courseId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl1}/user-courses/course/${courseId}/students`);
  }

  // Récupérer les cours auxquels l'utilisateur est inscrit
  getUserCourses(userId: number): Observable<UserCourse[]> {
    return this.http.get<UserCourse[]>(`${this.apiUrl1}/user-courses/user/${userId}`);
  }

  // Méthode pour marquer un cours comme terminé
  completeCourse(userId: number, courseId: number): Observable<any> {
    const url = `${this.apiUrl1}/user-courses/complete`;
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('courseId', courseId.toString());
    return this.http.put(url, {}, { params }); // Corps vide, les paramètres sont dans l'URL
  }

  // Créer un cours
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // Mettre à jour un cours
  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  // Supprimer un cours
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
