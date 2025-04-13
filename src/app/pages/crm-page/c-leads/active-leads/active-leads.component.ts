import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { ExpenseService } from '../../../../services/expense.service';
import { RevenueService } from '../../../../services/revenue.service'; // Import RevenueService
import { ProjectDTO } from '../../../../models/project.model'; // Import ProjectDTO

@Component({
    selector: 'app-active-leads',
    templateUrl: './active-leads.component.html',
    styleUrl: './active-leads.component.scss',
    imports: [CommonModule] // Add CommonModule here
})
export class ActiveLeadsComponent {
    expenseData: any = []; // Initialize as an empty array
    activeProjects: ProjectDTO[] = []; // Add property for active projects
    totalProjects: number = 0; // Add property for total projects
    stats: { totalExpenses: number; totalProjects: number } = { totalExpenses: 0, totalProjects: 0 }; // Add stats property
    errorMessage: string = ''; // Add an error message property

    constructor(
        public themeService: CustomizerSettingsService,
        private expenseService: ExpenseService,
        private revenueService: RevenueService // Inject RevenueService
    ) {}

    ngOnInit(): void {
        this.fetchExpenseData();
        this.fetchActiveProjects(); // Fetch active projects
    }

    private fetchExpenseData(): void {
        this.expenseService.getAllExpenses().subscribe(
            data => {
                this.expenseData = data;
                this.stats.totalExpenses = data.reduce((total, expense) => total + expense.amount, 0); // Calculate total expenses
            },
            error => {
                this.errorMessage = 'Failed to load expense data.';
                console.error(error);
            }
        );
    }

    private fetchActiveProjects(): void {
        this.revenueService.getExternalProjects().subscribe(
            projects => {
                this.activeProjects = projects;
                this.stats.totalProjects = projects.length; // Calculate total projects
            },
            error => {
                this.errorMessage = 'Failed to load active projects.';
                console.error(error);
            }
        );
    }
}