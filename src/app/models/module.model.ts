export class Module {
    id?: number; // Optionnel car généré par le backend
    title: string | undefined;
    content: string | undefined;
    duration: number | undefined;
    videoUrl?: string; // Optionnel car peut être null
    orderInCourse?: number; // Optionnel
    courseId?: number; // Optionnel
  }
