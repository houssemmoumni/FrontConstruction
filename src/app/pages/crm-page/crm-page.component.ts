import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { BudgetService } from '../../services/budget.service';

@Component({
    selector: 'app-crm-page',
    templateUrl: './crm-page.component.html',
    styleUrl: './crm-page.component.scss',
    imports: [RouterModule] // Add RouterModule here
})
export class CrmPageComponent {
    budgetData: any;

    constructor(private budgetService: BudgetService) {}

    ngOnInit(): void {
        this.fetchBudgetData();
    }

    private fetchBudgetData(): void {
        this.budgetService.getAllBudgets().subscribe(data => {
            this.budgetData = data;
        });
    }
}