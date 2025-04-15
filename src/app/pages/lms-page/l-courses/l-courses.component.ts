import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-l-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    AllCoursesComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './l-courses.component.html',
  styleUrls: ['./l-courses.component.scss'],
})
export class LCoursesComponent implements OnInit {
  courses: Course[] = []; // Liste de tous les cours
  filteredCourses: Course[] = []; // Liste des cours filtrés

  // Variables pour les filtres
  selectedStatus: string = 'all';
  selectedDuration: string = 'all';
  selectedInstructor: string = '';

  constructor(
    public themeService: CustomizerSettingsService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        console.log('Courses loaded from API:', data); // Afficher les données récupérées
        this.courses = data;
        this.filteredCourses = data; // Par défaut, afficher tous les cours
      },
      error: (err) => console.error('Failed to load courses', err),
    });
  }

  // Appliquer le filtre en fonction du critère
  applyFilter(filterType: string): void {
    this.filteredCourses = this.courses.filter((course) => {
      // Filtre par statut
      const statusMatch =
        this.selectedStatus === 'all' ||
        (this.selectedStatus === 'published' && course.isPublished) ||
        (this.selectedStatus === 'unpublished' && !course.isPublished);

      // Filtre par durée
      const durationMatch =
        this.selectedDuration === 'all' ||
        (this.selectedDuration === 'short' && course.duration <= 5) ||
        (this.selectedDuration === 'long' && course.duration > 5);

      // Filtre par instructeur
      const instructorMatch =
        !this.selectedInstructor ||
        course.instructor.toLowerCase().includes(this.selectedInstructor.toLowerCase());

      return statusMatch && durationMatch && instructorMatch;
    });
  }
}
