// src/app/models/user.model.ts
export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // À utiliser avec précaution (ne jamais afficher en clair)
    role: string; // Par exemple : 'admin', 'user', etc.
  }
