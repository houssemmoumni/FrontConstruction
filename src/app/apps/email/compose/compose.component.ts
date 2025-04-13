import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { FinancialReportService } from '../../../services/financial-report.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { SidebarComponent } from '../../../common/sidebar/sidebar.component'; // Import SidebarComponent

@Component({
    selector: 'app-compose',
    templateUrl: './compose.component.html',
    styleUrl: './compose.component.scss',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        NgIf,
        SidebarComponent // Import SidebarComponent
    ]
})
export class ComposeComponent {
    emailForm: FormGroup; // Form group for email data
    successMessage: string = ''; // Success message
    errorMessage: string = ''; // Error message

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private financialReportService: FinancialReportService,
        public themeService: CustomizerSettingsService
    ) {
        this.emailForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            total_revenue: new FormControl('', [Validators.required]),
            net_profit: new FormControl('', [Validators.required]),
            date_rapport: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]) // Default to today's date
        });
    }

    sendReport(): void {
        if (this.emailForm.invalid) {
            this.errorMessage = 'Please fill in all required fields.';
            return;
        }

        const report = {
            id_rapport: 1, // Example ID
            email: this.emailForm.value.email,
            total_revenue: this.emailForm.value.total_revenue,
            net_profit: this.emailForm.value.net_profit,
            date_rapport: this.emailForm.value.date_rapport
        };

        this.financialReportService.sendFinancialReport(report).subscribe(
            response => {
                if (response === 'Financial Report sent successfully!') {
                    this.successMessage = response;
                    this.errorMessage = '';
                    this.emailForm.reset();
                } else {
                    this.errorMessage = 'Unexpected response from the server.';
                    console.error('Unexpected response:', response);
                }
            },
            error => {
                this.errorMessage = error.error || 'Failed to send financial report. Please try again.';
                console.error('Error sending financial report:', error);
            }
        );
    }
}