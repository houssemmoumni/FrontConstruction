// src/app/models/user-course.model.ts
import { Course } from './course.model';
import { User } from './user.model'; // Importer le modèle User

export interface UserCourse {
  id: number;
  user: User; // Inclut les données de l'utilisateur
  course: Course; // Inclut les données du cours
  completed: boolean;
  completionDate?: string; // Optionnel
}
