import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  interview: Interview | null = null;

  constructor(
    private route: ActivatedRoute,
    private interviewService: InterviewService
  ) {}

  ngOnInit(): void {
    const interviewId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("🔹 ID récupéré depuis l'URL :", interviewId);
    this.loadInterview(interviewId);
  }

  loadInterview(id: number): void {
    console.log("📡 Appel API pour récupérer l'entretien avec ID :", id);
    this.interviewService.getInterviewById(id).subscribe(
      (data) => {
        console.log("✅ Entretien récupéré :", data);
        this.interview = data;
      },
      (error) => {
        console.error('❌ Erreur lors de la récupération de l\'entretien', error);
        this.interview = null;
      }
    );
  }
}
