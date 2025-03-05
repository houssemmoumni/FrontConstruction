import { Role } from './role';

export interface User {
  userId: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string; // Facultatif pour éviter d'exposer le mot de passe
  roles: Role[]; // Liste des rôles associés
  dateCreation: string; // LocalDateTime en format ISO string
  dernierLogin?: string; // Optionnel
  statut: 'actif' | 'inactif' | 'suspendu'; // Exemples de statuts
  enabled?: boolean; // Optionnel pour l'état de l'utilisateur
}


