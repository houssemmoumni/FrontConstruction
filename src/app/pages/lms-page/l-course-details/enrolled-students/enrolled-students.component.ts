// src/app/components/enrolled-students/enrolled-students.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { CourseService } from '../../../../services/course.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-enrolled-students',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, MatTableModule, MatProgressBarModule],
  templateUrl: './enrolled-students.component.html',
  styleUrls: ['./enrolled-students.component.scss'],
})
export class EnrolledStudentsComponent implements OnInit {
  @Input() courseId!: number; // Propriété d'entrée pour recevoir l'ID du cours

  displayedColumns: string[] = ['userID', 'student', 'email'];
  dataSource = new MatTableDataSource<User>();

  constructor(
    public themeService: CustomizerSettingsService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    if (this.courseId) {
      this.loadEnrolledStudents(this.courseId); // Charger les étudiants inscrits si courseId est défini
    }
  }

  loadEnrolledStudents(courseId: number): void {
    this.courseService.getEnrolledStudents(courseId).subscribe({
      next: (students) => {
        this.dataSource.data = students;
      },
      error: (err) => {
        console.error('Failed to load enrolled students:', err);
      },
    });
  }
}
