import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../../services/module.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Module } from '../../../models/module.model';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FileUploadModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  styleUrls: ['./add-content.component.scss'],
})
export class AddContentComponent implements OnInit {
    @Input() courseId!: number;
    moduleForm: FormGroup;
    selectedFileName: string | null = null;

    constructor(
      private fb: FormBuilder,
      private snackBar: MatSnackBar,
      private route: ActivatedRoute,
      private moduleService: ModuleService,
      private router: Router
    ) {
      this.moduleForm = this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        duration: [0, [Validators.required, Validators.min(1)]],
        videoFile: [null, Validators.required], // Mark video file as required
      });
    }

    ngOnInit(): void {
      this.courseId = this.route.snapshot.params['courseId']; // Get course ID from the route
    }

    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.selectedFileName = file.name;
        this.moduleForm.patchValue({ videoFile: file });
        this.moduleForm.get('videoFile')?.updateValueAndValidity(); // Update form control validity
      } else {
        this.selectedFileName = null;
      }
    }

    onSubmit(): void {
      if (this.moduleForm.valid) {
        const moduleData = {
          title: this.moduleForm.get('title')!.value,
          content: this.moduleForm.get('content')!.value,
          duration: this.moduleForm.get('duration')!.value,
          videoUrl: undefined, // Default value
          orderInCourse: 0, // Default value
          courseId: this.courseId, // Associate module with the course
        };

        const videoFile = this.moduleForm.get('videoFile')!.value;

        this.moduleService.addModuleToCourse(this.courseId, moduleData).subscribe({
          next: (response) => {
            const moduleId = response.id;
            if (moduleId === undefined) {
              console.error('Module ID is undefined');
              this.snackBar.open('Failed to add module.', 'Close', { duration: 3000 });
              return;
            }

            if (videoFile) {
              this.moduleService.addVideoToModule(moduleId, videoFile).subscribe({
                next: (videoResponse) => {
                  this.snackBar.open('Module and video added successfully!', 'Close', { duration: 3000 });
                  this.router.navigate(['lms-page/course-details', this.courseId]);
                },
                error: (videoErr) => {
                  console.error('Error adding video:', videoErr);
                  this.snackBar.open('Failed to add video.', 'Close', { duration: 3000 });
                },
              });
            } else {
              this.snackBar.open('Module added successfully!', 'Close', { duration: 3000 });
              this.router.navigate(['lms-page/course-details', this.courseId]);
            }
          },
          error: (err) => {
            console.error('Error adding module:', err);
            this.snackBar.open('Failed to add module.', 'Close', { duration: 3000 });
          },
        });
      } else {
        console.log('Form is invalid');
      }
    }
  }
