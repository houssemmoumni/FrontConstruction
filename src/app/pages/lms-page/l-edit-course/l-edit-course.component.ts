import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-l-edit-course',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxEditorModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './l-edit-course.component.html',
  styleUrls: ['./l-edit-course.component.scss'],
})
export class LEditCourseComponent implements OnInit, OnDestroy {
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

  // Course ID from route
  courseId!: number;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeService: CustomizerSettingsService,
    private fb: FormBuilder,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    // Initialize the form
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      instructor: ['', Validators.required],
      isPublished: [false],
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize the editor only in the browser
      this.editor = new Editor();
    }

    // Get the course ID from the route
    this.courseId = +this.route.snapshot.params['id'];

    // Fetch the course details
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.courseForm.patchValue(course); // Pre-fill the form with course data
      },
      error: (err) => {
        console.error('Failed to fetch course:', err);
        this.snackBar.open('Failed to fetch course details.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.editor) {
      this.editor.destroy();
    }
  }

  // Submit the form
  onSubmit(): void {
    if (this.courseForm.valid) {
      const updatedCourse: Course = this.courseForm.value;
      this.courseService.updateCourse(this.courseId, updatedCourse).subscribe({
        next: (response) => {
          console.log('Course updated successfully:', response);
          this.snackBar.open('Course updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        error: (err) => {
          console.error('Failed to update course:', err);
          this.snackBar.open('Failed to update course. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar'],
      });
    }
  }
}
