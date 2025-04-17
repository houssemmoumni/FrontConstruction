import { Expense } from "./expense.model";
import { ProjectDTO } from "./projectt.model";

export interface Budget {
    id_budget: number;
    total_amount: number;
    sprint_amount: number;
    expenses?: Expense[];
    project?: ProjectDTO;
}
