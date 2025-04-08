// src/app/components/user-course-list/user-course-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; // Importer SweetAlert2


@Component({
  selector: 'app-user-course-list',
  imports: [
    CommonModule,FormsModule
  ],
  templateUrl: './user-course-list.component.html',
  styleUrls: ['./user-course-list.component.scss'],
})
export class UserCourseListComponent implements OnInit {
    courses: Course[] = []; // Liste complète des cours
    filteredCourses: Course[] = []; // Liste filtrée des cours
    searchQuery: string = ''; // Requête de recherche

    constructor(private courseService: CourseService, private router: Router) {}

    ngOnInit(): void {
      this.loadCourses();
    }

    // Charger tous les cours publiés
    loadCourses(): void {
      this.courseService.getAllPublishedCourses().subscribe(
        (response) => {
          this.courses = response;
          this.filteredCourses = response; // Initialiser la liste filtrée
        },
        (error) => {
          console.error('Erreur lors de la récupération des cours:', error);
        }
      );
    }

    // Appliquer le filtre de recherche
    applyFilter(): void {
      this.filteredCourses = this.courses.filter((course) =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Effacer la recherche
    clearSearch(): void {
      this.searchQuery = '';
      this.applyFilter();
    }

    // Rediriger vers la page de détails d'un cours
    viewCourseDetails(courseId: number): void {
      this.router.navigate(['lms-page/detailscourse', courseId]);
    }

    // S'inscrire à un cours
    enrollInCourse(courseId: number): void {
        const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
        this.courseService.enrollUserInCourse(userId, courseId).subscribe(
          (response: any) => {
            console.log('Inscription réussie:', response);
            // Afficher une alerte SweetAlert2 pour le succès
            Swal.fire({
              title: 'Succès !',
              text: 'Vous êtes inscrit à ce cours !',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Voir mes cours',
              cancelButtonText: 'Continuer à naviguer',
            }).then((result) => {
              if (result.isConfirmed) {
                // Rediriger vers la page "Mes Cours"
                this.router.navigate(['lms-page/mycourse']);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Rediriger vers une autre page (par exemple, la liste des cours)
                this.router.navigate(['lms-page/mycourse']);
              }
            });
          },
          (error: any) => {
            console.error('Erreur lors de l\'inscription:', error);
            // Afficher une alerte SweetAlert2 pour l'erreur
            Swal.fire({
              title: 'Erreur !',
              text: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
      }
  }
