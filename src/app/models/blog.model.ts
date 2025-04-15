export interface Blog {
    id: number;
    title: string;
    content: string;
    photo: string;
    date: string; // Ou LocalDate si tu utilises une bibliothèque de gestion de dates
    author: {
      id: number;
      username: string; // Supposons que l'auteur a un nom
    };
    comments: BlogComment[];
    ratings: Rating[];
  }

  export interface BlogComment {
    id: number;
  author: string;
  content: string;
  date: string;
  avatar?: string;
  likes: number; // Nombre de likes
  dislikes: number; // Nombre de dislikes
  replies?: BlogComment[]; // Réponses au commentaire
  isReplying?: boolean; // Pour afficher/masquer le formulaire de réponse
  }


  export interface Rating {
    id: number;
    value: number;
    author: {
      id: number;
      username: string;
    };
  }
