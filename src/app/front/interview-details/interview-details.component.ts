// src/app/front/interview-details/interview-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterviewService } from '../../services/Interview.service';
import { Interview } from '../../models/interview.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interview-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.css'],
})
export class InterviewDetailsComponent implements OnInit {
  interview: Interview | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private interviewService: InterviewService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.interviewService.getInterviewById(+id).subscribe(
        (data) => {
          this.interview = data;
        },
        (error) => {
          if (error.status === 404) {
            this.errorMessage = 'L\'entretien demandé n\'existe pas.';
          } else {
            this.errorMessage = 'Erreur lors de la récupération de l\'entretien.';
          }
          console.error(this.errorMessage, error);
        }
      );
    } else {
      this.errorMessage = 'ID d\'entretien non valide.';
    }
  }
}
