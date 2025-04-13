import { Expense } from "./expense.model";
import { ProjectDTO } from "./project.model"; // Import ProjectDTO

export interface Budget {
    id_budget: number;
    total_amount: number;
    sprint_amount: number;
    expenses?: Expense[]; // Optional relationship with expenses
    project?: ProjectDTO; // Add relationship with ProjectDTO
}
