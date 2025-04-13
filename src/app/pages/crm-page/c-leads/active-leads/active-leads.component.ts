import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { ExpenseService } from '../../../../services/expense.service';

@Component({
    selector: 'app-active-leads',
    templateUrl: './active-leads.component.html',
    styleUrl: './active-leads.component.scss'
})
export class ActiveLeadsComponent {
    expenseData: any = []; // Initialize as an empty array
    errorMessage: string = ''; // Add an error message property

    constructor(
        public themeService: CustomizerSettingsService,
        private expenseService: ExpenseService
    ) {}

    ngOnInit(): void {
        this.fetchExpenseData();
    }

    private fetchExpenseData(): void {
        this.expenseService.getAllExpenses().subscribe(
            data => {
                this.expenseData = data;
            },
            error => {
                this.errorMessage = 'Failed to load expense data.';
                console.error(error);
            }
        );
    }
}