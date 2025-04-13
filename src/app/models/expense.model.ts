import { Budget } from "./budget.model";

export interface Expense {
    id_expense: number;
    description_expense: string;
    amount: number;
    expense_date: string;
}
