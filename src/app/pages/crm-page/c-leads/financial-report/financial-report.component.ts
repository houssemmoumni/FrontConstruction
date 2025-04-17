import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatOptionModule } from '@angular/material/core'; // Import MatOptionModule
import { FinancialReportService } from '../../../../services/financial-report.service';
import { FinancialReport } from '../../../../models/financial-report.model';

@Component({
    selector: 'app-financial-report',
    templateUrl: './financial-report.component.html',
    styleUrl: './financial-report.component.scss',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule // Add MatOptionModule
    ]
})
export class FinancialReportComponent implements OnInit {
    financialReports: FinancialReport[] = []; // Initialize as an empty array
    selectedReportId: number | null = null; // Selected report ID
    errorMessage: string = ''; // Error message

    constructor(private financialReportService: FinancialReportService) {}

    ngOnInit(): void {
        this.fetchFinancialReports();
    }

    private fetchFinancialReports(): void {
        this.financialReportService.getAllFinancialReports().subscribe(
            reports => {
                this.financialReports = reports; // Populate financialReports
            },
            error => {
                this.errorMessage = 'Failed to load financial reports.';
                console.error('Error fetching financial reports:', error);
            }
        );
    }

    downloadSelectedReport(): void {
        if (!this.selectedReportId) {
            this.errorMessage = 'Please select a report to download.';
            return;
        }

        this.financialReportService.downloadReportById(this.selectedReportId).subscribe(
            (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'rapport_financier.pdf';
                a.click();
                window.URL.revokeObjectURL(url);
            },
            (error) => {
                this.errorMessage = 'Failed to download the report. Please try again.';
                console.error('Error downloading report:', error);
            }
        );
    }
}
