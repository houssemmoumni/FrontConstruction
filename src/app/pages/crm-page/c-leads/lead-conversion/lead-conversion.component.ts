import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { FinancialReportService } from '../../../../services/financial-report.service';

@Component({
    selector: 'app-lead-conversion',
    templateUrl: './lead-conversion.component.html',
    styleUrl: './lead-conversion.component.scss'
})
export class LeadConversionComponent {
    financialReportData: any = []; // Initialize as an empty array
    errorMessage: string = ''; // Add an error message property

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
                this.financialReportData = { net_profit: netProfit };
            },
            error => {
                this.errorMessage = 'Failed to calculate net profit.';
                console.error(error);
            }
        );
    }
}