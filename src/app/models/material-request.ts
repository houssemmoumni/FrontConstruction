import { MaterialStatus } from "./material-status";

export interface MaterialRequest {
    name: string;
    description: string;
    availableQuantity: number;
    price: number;
    categoryId: number;
    status: MaterialStatus;
}
