export enum CategoryRevenue {
    CLIENT_PAYMENT = "CLIENT_PAYMENT",
    INVESTMENT = "INVESTMENT",
    OTHER = "OTHER"
}

export interface Revenue {
    id_revenue?: number; // Optional ID
    description_revenue: string;
    amount: number;
    date_revenue: string;
    category: CategoryRevenue;
}
