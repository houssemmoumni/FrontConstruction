import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { RevenueService } from '../../../../services/revenue.service';

@Component({
    selector: 'app-revenue-growth',
    templateUrl: './revenue-growth.component.html',
    styleUrl: './revenue-growth.component.scss',
    imports: [CommonModule] // Add CommonModule here
})
export class RevenueGrowthComponent {
    revenueData: any = { amount: 0, growthPercentage: 0 }; // Initialize with default values
    externalProjects: any = []; // Initialize as an empty array
    errorMessage: string = ''; // Add an error message property

    constructor(
        public themeService: CustomizerSettingsService,
        private revenueService: RevenueService
    ) {}

    ngOnInit(): void {
        this.fetchRevenueData();
        this.fetchExternalProjects();
    }

    private fetchRevenueData(): void {
        this.revenueService.getAllRevenues().subscribe(
            revenues => {
                const totalAmount = revenues.reduce((total, revenue) => total + revenue.amount, 0);
                this.revenueData = { amount: totalAmount, growthPercentage: 10 }; // Example growth percentage
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
}