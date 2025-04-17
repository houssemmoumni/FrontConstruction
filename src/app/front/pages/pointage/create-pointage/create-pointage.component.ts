import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule 
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PointageService } from '../../../../../services/pointage.service';
import { UserService } from '../../../../../services/user.service';
import { User } from '../../../../../models/user.model';
import { CreatePointageDto } from '../../../../../models/pointage.model';
import { Banner1Component } from "../../../elements/banner/banner1/banner1.component";

@Component({
  selector: 'app-create-pointage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule,
    Banner1Component
  ],
  templateUrl: './create-pointage.component.html',
  styleUrls: ['./create-pointage.component.scss']
})
export class CreatePointageComponent implements OnInit {
  pointageForm: FormGroup;
  users: User[] = [];
  todayDate: string;
  entryTime: Date | null = null;
  exitTime: Date | null = null;
  isLoading = false;
  banner: any = {
    pagetitle: "Create Pointage",
    bg_image: "assets/images/banner/bnr2.jpg",
    title: "Create Pointage",
  };

  constructor(
    private fb: FormBuilder,
    private pointageService: PointageService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.pointageForm = this.fb.group({
      jour_pointage: [this.todayDate, Validators.required],
      id_user: ['', Validators.required],
      temps_commencement: ['08:00', Validators.required],
      temps_finition: ['17:00', Validators.required],
      localisation: ['', Validators.required],
      temps_entree: ['', Validators.required],
      temps_sortie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (err) => {
        console.error('Failed to load users:', err);
        this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
      }
    });
  }

  registerEntry(): void {
    const now = new Date();
    this.entryTime = now;
    this.pointageForm.patchValue({
      temps_entree: this.formatTime(now)
    });
  }

  registerExit(): void {
    const now = new Date();
    this.exitTime = now;
    this.pointageForm.patchValue({
      temps_sortie: this.formatTime(now)
    });
  }

  private formatTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  createPointage(): void {
    if (this.pointageForm.valid) {
      this.isLoading = true;
      
      const formData = this.pointageForm.value;
      const selectedUser = this.users.find(user => user.id === formData.id_user);
      
      if (!selectedUser) {
        this.showError('Selected user not found');
        this.isLoading = false;
        return;
      }

      const pointageData: CreatePointageDto = {
        ...formData,
        user: { id: formData.id_user },
        id_user: undefined
      };

      // Pass the selected user's phone number to the service
      this.pointageService.createPointage(pointageData, selectedUser.telephone).subscribe({
        next: (createdPointage) => {
          if (createdPointage?.id) {
            this.displayPdfInBrowser(createdPointage.id);
            this.snackBar.open('Pointage created successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error creating pointage:', err);
          this.showError('Failed to create pointage');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  private displayPdfInBrowser(pointageId: number): void {
    const pdfUrl = this.pointageService.getPointagePdfUrl(pointageId);
    window.open(pdfUrl, '_blank');
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}