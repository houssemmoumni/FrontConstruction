import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  paginatedProjects: Project[] = [];
  searchText = '';
  pageSize = 5;
  currentPage = 0;
  isEditing = false;
  currentProject: Project = {
    name: '',
    location: '',
    description: '',
    published: false
  };
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  displayedColumns: string[] = ['name', 'location', 'description', 'image', 'status', 'actions'];

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data.map(project => ({
          ...project,
          image: project.image ? 'data:image/jpeg;base64,' + project.image : null
        }));
        this.filteredProjects = [...this.projects];
        this.updatePaginatedProjects();
      },
      error: (err) => {
        console.error('Error:', err);
        this.showError('Failed to load projects');
      }
    });
  }

  applyFilter(): void {
    this.filteredProjects = this.projects.filter(project =>
      project.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      project.location.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(this.searchText.toLowerCase()))
    );
    this.currentPage = 0;
    this.updatePaginatedProjects();
  }

  updatePaginatedProjects(): void {
    const start = this.currentPage * this.pageSize;
    this.paginatedProjects = this.filteredProjects.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProjects();
  }

  togglePublish(project: Project): void {
    if (!project.id) return;

    const action = project.published
      ? this.projectService.unpublishProject(project.id)
      : this.projectService.publishProject(project.id);

    action.subscribe({
      next: () => {
        project.published = !project.published;
        this.showSuccess(`Project ${project.published ? 'published' : 'unpublished'} successfully`);
      },
      error: (err) => {
        console.error('Error:', err);
        this.showError(`Failed to ${project.published ? 'unpublish' : 'publish'} project`);
      }
    });
  }

  editProject(project: Project): void {
    this.currentProject = { ...project };
    this.previewImage = project.image || null;
    this.isEditing = true;
  }

  deleteProject(project: Project): void {
    if (!project.id) return;

    if (confirm(`Are you sure you want to delete project "${project.name}"?`)) {
      this.projectService.deleteProject(project.id).subscribe({
        next: () => {
          this.loadProjects();
          this.showSuccess('Project deleted successfully');
        },
        error: (err) => {
          console.error('Error:', err);
          this.showError('Failed to delete project');
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.currentProject.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.previewImage = null;
    this.currentProject.image = null;
    this.selectedFile = null;
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  submitForm(): void {
    if (!this.validateForm()) return;

    const projectData: Project = {
      name: this.currentProject.name,
      location: this.currentProject.location,
      description: this.currentProject.description,
      published: this.currentProject.published || false
    };

    const operation = this.currentProject.id
      ? this.projectService.updateProject(this.currentProject.id, projectData, this.selectedFile || undefined)
      : this.projectService.createProject(projectData, this.selectedFile || undefined);

    operation.subscribe({
      next: () => {
        this.loadProjects();
        this.cancelForm();
        this.showSuccess(`Project ${this.currentProject.id ? 'updated' : 'added'} successfully`);
      },
      error: (err) => {
        console.error('Error:', err);
        this.showError(`Failed to ${this.currentProject.id ? 'update' : 'add'} project`);
      }
    });
  }

  cancelForm(): void {
    this.isEditing = false;
    this.currentProject = {
      name: '',
      location: '',
      description: '',
      published: false
    };
    this.selectedFile = null;
    this.previewImage = null;
  }

  private validateForm(): boolean {
    if (!this.currentProject.name?.trim()) {
      this.showError('Project name is required');
      return false;
    }
    if (!this.currentProject.location?.trim()) {
      this.showError('Project location is required');
      return false;
    }
    return true;
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
