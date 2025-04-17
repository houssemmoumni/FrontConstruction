import { Expense } from "./expense.model";
import { Revenue } from "./revenue.model";

export interface FinancialReport {
    id_rapport: number;
    date_rapport: string;
    total_revenue: number;
    net_profit: number;
    email: string;
    signature?: string; // Add the signature field (optional)
}
