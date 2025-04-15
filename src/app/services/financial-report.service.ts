import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FinancialReport } from '../models/financial-report.model';
import { RevenueService } from './revenue.service'; // Import RevenueService
import { ExpenseService } from './expense.service'; // Import ExpenseService

@Injectable({
  providedIn: 'root'
})
export class FinancialReportService {
  getReport() {
      throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8045/api/financial-reports';

  constructor(
    private http: HttpClient,
    private revenueService: RevenueService, // Inject RevenueService
    private expenseService: ExpenseService // Inject ExpenseService
  ) {}

  getAllFinancialReports(): Observable<FinancialReport[]> {
    return this.http.get<FinancialReport[]>(this.apiUrl);
  }

  getFinancialReportById(id: number): Observable<FinancialReport> {
    return this.http.get<FinancialReport>(`${this.apiUrl}/${id}`);
  }

  createFinancialReport(report: FinancialReport): Observable<FinancialReport> {
    return this.http.post<FinancialReport>(this.apiUrl, report);
  }

  updateFinancialReport(id: number, report: FinancialReport): Observable<FinancialReport> {
    return this.http.put<FinancialReport>(`${this.apiUrl}/${id}`, report);
  }

  deleteFinancialReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  sendFinancialReport(report: FinancialReport): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/send`, report).pipe(
        map(response => {
            console.log('Financial Report sent successfully:', response);
            return response;
        }),
        catchError(error => {
            let errorMessage = 'Financial Report sent successfully.';
            if (error.status === 400) {
                errorMessage = 'Invalid request. Please check the report details.';
            } else if (error.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            } else if (error.status === 0) {
                errorMessage = 'Network error. Please check your internet connection.';
            }
            console.error('Error sending financial report:', error);
            return throwError(() => new Error(errorMessage));
        })
    );
  }

  downloadReportById(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${id}`, { responseType: 'blob' });
  }

  downloadReport(report: FinancialReport): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/download`, report, { responseType: 'blob' });
  }

  getNetProfit(): Observable<number> {
    return forkJoin({
        revenues: this.revenueService.getAllRevenues(), // Use RevenueService
        expenses: this.expenseService.getAllExpenses() // Use ExpenseService
    }).pipe(
        map(({ revenues, expenses }) => {
            const totalRevenue = revenues.reduce((total, revenue) => total + revenue.amount, 0);
            const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
            return totalRevenue - totalExpenses;
        })
    );
  }
}
