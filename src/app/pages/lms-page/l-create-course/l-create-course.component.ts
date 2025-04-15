import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-l-create-course',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxEditorModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './l-create-course.component.html',
  styleUrls: ['./l-create-course.component.scss'],
})
export class LCreateCourseComponent implements OnInit, OnDestroy {
  // Text Editor
  editor!: Editor | null; // Make it nullable
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  // Form Group
  courseForm: FormGroup;

  // Instructor Select
  instructorList: string[] = ['Ann Cohen', 'Lea Lewis', 'Lillie Walker', 'Lynn Flinn', 'Mark Rivera'];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeService: CustomizerSettingsService,
    private fb: FormBuilder,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Initialize the form
    this.courseForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5), // Minimum 5 caractères
          Validators.maxLength(100), // Maximum 100 caractères
          Validators.pattern(/^[a-zA-Z\s]*$/), // Uniquement des lettres et des espaces
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10), // Minimum 10 caractères
          Validators.maxLength(500), // Maximum 500 caractères
        ],
      ],
      duration: [
        0,
        [
          Validators.required,
          Validators.min(1), // Durée minimale de 1 minute
          Validators.max(600), // Durée maximale de 600 minutes
        ],
      ],
      instructor: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/), // Uniquement des lettres et des espaces
        ],
      ],
      isPublished: [false],
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize the editor only in the browser
      this.editor = new Editor();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.editor) {
      this.editor.destroy();
    }
  }

  // Submit the form
  onSubmit(): void {
    if (this.courseForm.valid) {
      const course: Course = this.courseForm.value;
      this.courseService.createCourse(course).subscribe({
        next: (response) => {
          console.log('Course created successfully:', response);
          this.snackBar.open('Course created successfully!', 'Close', {
            duration: 3000, // Durée du message en millisecondes
            panelClass: ['success-snackbar'], // Classe CSS pour le style
          });

          // Rediriger vers la page des cours après la création réussie
          this.router.navigateByUrl('lms-page');


        },
        error: (err) => {
          console.error('Failed to create course:', err);
          this.snackBar.open('Failed to create course. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'], // Classe CSS pour le style
          });
        },
      });
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar'], // Classe CSS pour le style
      });
    }
  }
}
