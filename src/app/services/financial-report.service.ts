import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { FinancialReport } from '../models/financial-report.model';
import { Revenue } from '../models/revenue.model';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialReportService {
  private apiUrl = 'http://localhost:8045/api/financial-reports';

  constructor(private http: HttpClient) {}

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

  sendFinancialReport(report: FinancialReport): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send`, report);
  }

  getNetProfit(): Observable<number> {
    return forkJoin({
        revenues: this.http.get<Revenue[]>(`${this.apiUrl}/revenues`),
        expenses: this.http.get<Expense[]>(`${this.apiUrl}/expenses`)
    }).pipe(
        map(({ revenues, expenses }) => {
            const totalRevenue = revenues.reduce((total, revenue) => total + revenue.amount, 0);
            const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
            return totalRevenue - totalExpenses;
        })
    );
  }
}
