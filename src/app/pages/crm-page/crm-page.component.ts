import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BudgetService } from '../../services/budget.service';
import { RevenueGrowthComponent } from "../../dashboard/crm/stats/revenue-growth/revenue-growth.component";
import { FinancialReportComponent } from "./c-leads/financial-report/financial-report.component"; // Import FinancialReportComponent
import { ActiveLeadsComponent } from "./c-leads/active-leads/active-leads.component";

@Component({
    selector: 'app-crm-page',
    templateUrl: './crm-page.component.html',
    styleUrl: './crm-page.component.scss',
    imports: [RouterModule, RevenueGrowthComponent, FinancialReportComponent, ActiveLeadsComponent]
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