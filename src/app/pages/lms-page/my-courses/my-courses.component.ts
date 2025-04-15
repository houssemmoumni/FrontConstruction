// src/app/components/my-courses/my-courses.component.ts
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { UserCourse } from '../../../models/user-course.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-courses',
  imports: [
    CommonModule,FormsModule
  ],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit {
    enrolledCourses: UserCourse[] = []; // Liste des cours inscrits

    constructor(private courseService: CourseService, private router: Router) {}

    ngOnInit(): void {
      this.loadEnrolledCourses();
    }

    // Charger les cours auxquels l'utilisateur est inscrit
    loadEnrolledCourses(): void {
      const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
      this.courseService.getUserCourses(userId).subscribe(
        (response) => {
          this.enrolledCourses = response;
          console.log('Cours inscrits:', this.enrolledCourses); // Afficher les données dans la console
        },
        (error) => {
          console.error('Erreur lors de la récupération des cours inscrits:', error);
        }
      );
    }

    // Rediriger vers la page de détails d'un cours
    viewCourseDetails(id: number): void {
        this.router.navigate(['lms-page/detailscourse', id]);
      console.log('Voir les détails du cours:', id);
    }
  }
