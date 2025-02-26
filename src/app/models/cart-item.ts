import { Material } from "./material";

export interface CartItem {
    material: Material; // Reference to the Material entity
    quantity: number; // Quantity of the material in the cart

}
