import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { RevenueService } from '../../../../services/revenue.service';

@Component({
    selector: 'app-revenue-growth',
    templateUrl: './revenue-growth.component.html', // Ensure this path is correct
    styleUrl: './revenue-growth.component.scss',
    imports: [CommonModule]
})
export class RevenueGrowthComponent {
    revenueData: any = { amount: 0, growthPercentage: 0 };
    externalProjects: any = [];
    errorMessage: string = '';
    averageRevenue: number = 0; // Add a property to store average revenue

    constructor(
        public themeService: CustomizerSettingsService,
        private revenueService: RevenueService,
        private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.fetchRevenueData();
        this.fetchExternalProjects();
        this.fetchAverageRevenue(); // Fetch average revenue on initialization
    }

    private fetchRevenueData(): void {
        this.revenueService.getAllRevenues().subscribe(
            revenues => {
                const totalAmount = revenues.reduce((total, revenue) => total + revenue.amount, 0);
                this.revenueData = { amount: totalAmount, growthPercentage: 10 };
            },
            error => {
                this.errorMessage = 'Failed to load revenue data.';
                console.error(error);
            }
        );
    }

    private fetchExternalProjects(): void {
        this.revenueService.getExternalProjects().subscribe(
            data => {
                this.externalProjects = data.length ? data : [];
            },
            error => {
                this.errorMessage = 'Failed to load external projects.';
                console.error(error);
            }
        );
    }

    private fetchAverageRevenue(): void {
        this.revenueService.getAverageRevenue().subscribe(
            average => {
                console.log('Average Revenue:', average); // Debug log
                this.averageRevenue = average;
                this.cdr.detectChanges(); // Trigger change detection
            },
            error => {
                this.errorMessage = 'Failed to load average revenue.';
                console.error(error);
            }
        );
    }
}


