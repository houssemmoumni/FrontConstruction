import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../../../models/course.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from '../../../../services/course.service';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';

import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  imports: [
    CommonModule,

    MatCardModule,
    MatIconModule,
    MatFormField,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule ,
    FormsModule

  ],
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements AfterViewInit, OnChanges {
    @Input() courses: Course[] = []; // Reçoit les cours du parent

    displayedColumns: string[] = [
      'id',
      'title',
      'description',
      'duration',
      'instructor',
      'status',
      'action',
    ];
    dataSource = new MatTableDataSource<Course>();
    searchQuery: string = ''; // Requête de recherche

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      private cdr: ChangeDetectorRef,
      private snackBar: MatSnackBar,
      private courseService: CourseService
    ) {}

    ngAfterViewInit(): void {
      console.log('Courses received in child component:', this.courses); // Afficher les données reçues
      this.dataSource.data = this.courses; // Initialiser les données de la table
      this.dataSource.paginator = this.paginator;

      // Personnaliser le filtre pour rechercher dans les colonnes spécifiques
      this.dataSource.filterPredicate = (data: Course, filter: string) => {
        const searchText = filter.toLowerCase();
        return Object.values(data)
        .map(value => value?.toString().toLowerCase() || '')
        .some(text => text.includes(searchText));
    };

      this.cdr.detectChanges(); // Forcer la détection des changements
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['courses'] && changes['courses'].currentValue) {
        console.log('Courses updated in child component:', this.courses); // Afficher les données mises à jour
        this.dataSource.data = this.courses; // Mettre à jour les données de la table
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.cdr.detectChanges(); // Forcer la détection des changements
      }
    }

    // Appliquer le filtre de recherche
    applyFilter(): void {
        this.dataSource.filter = this.searchQuery.trim().toLowerCase();
      }

      // Effacer le champ de recherche
clearSearch(): void {
  this.searchQuery = '';
  this.applyFilter();
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
            this.courses = this.courses.filter((course) => course.id !== courseId); // Mettre à jour la liste des cours
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
