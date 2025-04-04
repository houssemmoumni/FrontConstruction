import { Material } from "./material";
import { PurchaseRequest } from "./purchase-request";

export interface OrderRequest {
    //reference: string;
    amount: number;
    paymentMethod: PaymentMethod;
    customerId: number;
    materials: PurchaseRequest[]
}

export enum PaymentMethod {
    PAYPAL,
    CREDIT_CARD,
    VISA,
    MASTER_CARD,
    BITCOIN
}
