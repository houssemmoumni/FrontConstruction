import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { FinancialReportService } from '../../../../services/financial-report.service';
import { FinancialReport } from '../../../../models/financial-report.model';

@Component({
    selector: 'app-financial-report',
    templateUrl: './financial-report.component.html',
    styleUrl: './financial-report.component.scss',
    imports: [CommonModule]
})
export class FinancialReportComponent {
    netProfit: number | null = null; // Store net profit
    errorMessage: string = ''; // Error message property
    successMessage: string = ''; // Success message property

    constructor(
        public themeService: CustomizerSettingsService,
        private financialReportService: FinancialReportService
    ) {}

    ngOnInit(): void {
        this.fetchNetProfit();
    }

    private fetchNetProfit(): void {
        this.financialReportService.getNetProfit().subscribe(
            netProfit => {
                this.netProfit = netProfit;
            },
            error => {
                this.errorMessage = 'Failed to fetch financial report.';
                console.error('Error fetching financial report:', error);
            }
        );
    }

    sendReport(): void {
        const report: FinancialReport = {
            id_rapport: 1, // Example ID
            date_rapport: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
            total_revenue: 55550.0, // Example revenue
            net_profit: this.netProfit || 0,
            email: 'ferjaouiaziz@example.com' // Example email
        };

        this.financialReportService.sendFinancialReport(report).subscribe(
            response => {
                console.log('Backend response:', response); // Log the response for debugging
                if (response) {
                    this.successMessage = response; // Display success message
                } else {
                    this.errorMessage = 'Unexpected response from the server.';
                }
            },
            error => {
                this.errorMessage = error.error || 'Failed to send financial report.';
                console.error('Error sending financial report:', error);
            }
        );
    }
}
