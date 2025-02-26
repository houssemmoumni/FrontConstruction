import { User } from './user';
import { Category } from './category';
import { MaterialStatus } from './material-status';
import { Image } from './image';
export interface Material {
    id: number;
    name: string;
    description: string;
    availableQuantity: number;
    price: number;
    category: Category;
    status: MaterialStatus;
    createdBy: number;
    image?:Image
  }
  
 