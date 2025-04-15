import { User } from "./user.model";

export interface UserCourse {
  id: number;
  user: User; // Inclut les données de l'utilisateur
  username: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
  lastSeen?: Date;
}
