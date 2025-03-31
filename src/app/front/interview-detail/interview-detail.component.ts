// src/app/front/interview-detail/interview-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from '../../services/interview.service';
import { Interview } from '../../models/interview.model';


@Component({
  selector: 'app-interview-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.css'],
})
export class InterviewDetailComponent implements OnInit {
  interviews: Interview[] = []; // Liste des entretiens
  applicationId!: number; // ID de la candidature
  errorMessage: string | null = null; // Message d'erreur

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interviewService: InterviewService
  ) {}
  navigateToBlogGrid2(): void {
    this.router.navigate(['/front/blog-grid-2']);
  }

  ngOnInit(): void {
    // Récupère l'ID de la candidature depuis l'URL
    this.applicationId = Number(this.route.snapshot.paramMap.get('applicationId'));

    // Vérifie si l'ID de la candidature est valide
    if (isNaN(this.applicationId)) {
      console.error("⚠️ ID de candidature invalide. Redirection vers la liste.");
      this.router.navigate(['/applications']);
      return;
    }

    console.log("🔹 ID de candidature récupéré depuis l'URL :", this.applicationId);
    this.loadInterviews(this.applicationId); // Charge les entretiens
  }

  // Charge les entretiens pour la candidature
  loadInterviews(applicationId: number): void {
    console.log("📡 Récupération des entretiens pour la candidature ID :", applicationId);
    this.interviewService.getInterviewsByApplicationId(applicationId).subscribe(
      (data: Interview[]) => {
        if (data && data.length > 0) {
          console.log("✅ Entretiens récupérés :", data);
          this.interviews = data;
        } else {
          console.warn("⚠️ Aucun entretien trouvé pour cette candidature !");
          this.errorMessage = "Aucun entretien trouvé pour cette candidature.";
        }
      },
      (error: any) => {
        console.error("❌ Erreur lors de la récupération des entretiens :", error);
        this.errorMessage = "Erreur serveur. Les entretiens sont peut-être inexistants.";
      }
    );
  }
}
