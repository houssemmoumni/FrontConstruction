import { Material } from "./material";

export interface Category {
    id: number;
  name: string;
  description: string;
  materials: Material[];
}
