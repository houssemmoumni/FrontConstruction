import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8045/api/expenses';

  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all expenses:', error);
        return throwError(error);
      })
    );
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching expense with id ${id}:`, error);
        return throwError(error);
      })
    );
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense).pipe(
      catchError(error => {
        console.error('Error creating expense:', error);
        return throwError(error);
      })
    );
  }

  updateExpense(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense).pipe(
      catchError(error => {
        console.error(`Error updating expense with id ${id}:`, error);
        return throwError(error);
      })
    );
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting expense with id ${id}:`, error);
        return throwError(error);
      })
    );
  }
}
