import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service'; // Importez votre service
import { Course } from '../../../models/course.model'; // Importez votre modèle de cours
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CourseInstructorComponent } from './course-instructor/course-instructor.component';
import { EnrolledStudentsComponent } from './enrolled-students/enrolled-students.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { CourseSalesComponent } from './course-sales/course-sales.component';
import { CourseVideosComponent } from './course-videos/course-videos.component';
import { CourseRatingsComponent } from './course-ratings/course-ratings.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTabNavPanel } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {  Input } from '@angular/core';


@Component({
  selector: 'app-l-course-details',
  imports: [
    MatCardModule,

    MatMenuModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    MatTableModule,
    MatTooltipModule,
    CourseInstructorComponent,
    EnrolledStudentsComponent,
    CourseContentComponent,
    CourseSalesComponent,
    CourseVideosComponent,
    CourseRatingsComponent,
  ],
  templateUrl: './l-course-details.component.html',
  styleUrls: ['./l-course-details.component.scss'],
})
export class LCourseDetailsComponent implements OnInit {


  displayedColumns: string[] = [
    'id',
    'courseName',
    'category',
    'instructor',
    'enrolledStudents',
    'startDate',
    'endDate',
    'price',
    'action',
  ];
  dataSource = new MatTableDataSource<Course>(); // Utilisez le modèle de cours

  courseId!: number;
  course!: Course; // Stockez les détails du cours ici
    snackBar: any;
    courses: any;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService, // Injectez votre service
    public themeService: CustomizerSettingsService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du cours depuis l'URL
    this.courseId = +this.route.snapshot.params['id'];

    // Charger les détails du cours
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.course = course; // Stocker les détails du cours
        this.dataSource.data = [course]; // Mettre à jour la source de données de la table
      },
      error: (err) => {
        console.error('Failed to fetch course details:', err);
      },
    });
  }


  // Méthode pour supprimer un cours
  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.snackBar.open('Course deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          // Recharger les données ou mettre à jour la table
          this.courses = this.courses.filter((course: { id: number; }) => course.id !== courseId); // Mettre à jour la liste des cours
          this.dataSource.data = this.courses; // Mettre à jour la source de données de la table
        },
        error: (err: any) => {
          console.error('Failed to delete course:', err);
          this.snackBar.open('Failed to delete course. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }




}
