import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { User } from '../models/user';
import { TaskRequest } from '../models/task-request';
import { TaskResponse } from '../models/task-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8222/api/v1/tasks';


  constructor(private http: HttpClient) { }
  getAllTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(this.apiUrl);
  }
  getAllTasksByUser(userId: number): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.apiUrl}/user/${userId}`);
  }


  getTaskById(taskId: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/${taskId}`);
  }

  createTask(task: TaskRequest): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(taskId: number, task: TaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.apiUrl}/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }

  assignTask(taskId: number, userId: number): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/assign`, { taskId, userId });
  }

  getWorkerTasks(workerId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/worker/${workerId}`);
  }
  
}
