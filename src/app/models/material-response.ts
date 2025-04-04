import { Category } from "./category";
import { Image } from "./image";
import { MaterialStatus } from "./material-status";
import { User } from "./user";

export interface MaterialResponse {
    id: number;
    name: string;
    description: string;
    availableQuantity: number;
    price: number;
    categoryName: string;
    status?: MaterialStatus;
    image: Image;
    dominantColor?: string; // Add this property

}
