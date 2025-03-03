import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ProjectManagementService } from '../../../services/project-management.service';
import { project, StatutProjet } from '../../../models/project.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

declare const google: any;
declare const L: any;

@Component({
  selector: 'app-pm-create-project',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    FileUploadModule,
    NgxEditorModule,
    NgIf,
    SafePipe,
    MatSnackBarModule
  ],
  templateUrl: './pm-create-project.component.html',
  styleUrls: ['./pm-create-project.component.scss']
})
export class PmCreateProjectComponent implements OnInit, OnDestroy {
  private map: any;
  private marker: any;
  mapUrl: string = '';

  isCreateProject: boolean = true;
  project: project = {
    projet_id: 0, 
    projet_name: '',
    projet_description: '',
    start_date: new Date().toISOString().split('T')[0], // Initialize as YYYY-MM-DD string
    end_date: null,  // Changed from undefined to null
    projectManager: '',
    statut_projet: undefined as unknown as StatutProjet, // Remove default value
    budget_estime: undefined as unknown as number,       // Remove default value
    risque_retard: undefined as unknown as number,       // Remove default value
    workers: [],  // Add the missing workers array
    latitude: null,
    longitude: null
  };

  projectstatuts = Object.values(StatutProjet);
  editor!: Editor | null;  
  projectManagers: string[] = [];
  minDate: Date = new Date(); // Minimum date for start date picker

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

  constructor(
    private projectManagementService: ProjectManagementService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    public themeService: CustomizerSettingsService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
      ) {
    this.projectManagers = this.projectManagementService.getProjectManagers();
    this.initializeMap(); // Make sure map is initialized right away
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.editor = new Editor();
    }

    this.activatedRoute.paramMap.subscribe(params => {
      const projet_id = params.get("projet_id");

      if (projet_id) {
        this.projectManagementService.getProjectById(Number(projet_id)).subscribe({
          next: (res: project) => {
            this.project = {
              ...res,
              start_date: this.formatDateForSpring(res.start_date),
              end_date: res.end_date ? this.formatDateForSpring(res.end_date) : null
            };
            this.isCreateProject = false;
            this.initializeMap(); // Reinitialize map when project data is loaded
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error loading project:', err);
            this.showMessage('Failed to load project details', true);
          }
        });
      }
    });

    window.addEventListener('message', this.onMapClick.bind(this));
  }

  ngOnDestroy(): void {
    this.editor?.destroy();  // Nettoyage de l'éditeur pour éviter les fuites mémoire
    window.removeEventListener('message', this.onMapClick.bind(this));
  }

  private showMessage(message: string, isError = false) {
    this.snackBar.open(message, 'Close', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: isError ? ['error-snackbar'] : ['success-snackbar']
    });
  }

  validateForm(): boolean {
    try {
        // Validate required fields
        if (!this.project.projet_name?.trim()) {
            throw new Error('Project name is required');
        }

        // Validate name format
        const namePattern = /^[a-zA-Z0-9\s-]{3,50}$/;
        if (!namePattern.test(this.project.projet_name)) {
            throw new Error('Project name must be 3-50 characters (letters, numbers, spaces, hyphens)');
        }

        // Date validation - only apply strict validation for new projects
        if (this.isCreateProject) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const startDate = new Date(this.project.start_date);
            startDate.setHours(0, 0, 0, 0);

            if (startDate < currentDate) {
                throw new Error('Start date cannot be in the past');
            }
        }

        // For both create and update: only validate end date if it exists
        if (this.project.end_date && this.project.start_date) {
            const startDate = new Date(this.project.start_date);
            const endDate = new Date(this.project.end_date);
            if (endDate < startDate) {
                throw new Error('End date must be after start date');
            }
        }

        // Validate numbers
        if (!this.project.budget_estime || this.project.budget_estime < 0) {
            throw new Error('Budget must be a positive number');
        }

        if (!this.project.risque_retard || this.project.risque_retard < 0 || this.project.risque_retard > 100) {
            throw new Error('Risk level must be between 0 and 100');
        }

        return true;
    } catch (error: any) {
        this.showMessage(error.message || 'Validation failed', true);
        return false;
    }
  }

  createProject(projectForm: NgForm): void {
    if (!this.validateForm()) {
        return;
    }

    const projectToSend = {
        ...this.project,
        projet_id: this.isCreateProject ? null : this.project.projet_id,
        projet_name: this.project.projet_name?.trim() || '',
        projet_description: this.project.projet_description?.trim() || '',
        start_date: this.formatDateForSpring(this.project.start_date),
        end_date: this.project.end_date ? this.formatDateForSpring(this.project.end_date) : null,
        statut_projet: this.project.statut_projet,
        projectManager: this.project.projectManager || '',
        budget_estime: Number(this.project.budget_estime) || 0,
        risque_retard: Number(this.project.risque_retard) || 0,
        latitude: this.project.latitude ? Number(this.project.latitude) : 36.8065,
        longitude: this.project.longitude ? Number(this.project.longitude) : 10.1815,
        workers: this.project.workers || []
    };

    console.log('Sending project data:', projectToSend);

    if (this.isCreateProject) {
        this.projectManagementService.createProject(projectToSend).subscribe({
            next: (response) => {
                this.showMessage('Project created successfully! 🎉');
                setTimeout(() => this.router.navigate(["/project-management-page/projects-list"]), 2000);
            },
            error: (error: any) => {
                console.error('Creation error:', error);
                this.showMessage(`Failed to create project: ${error.message || 'Please check your input'}`, true);
            }
        });
    } else {
        // Update existing project
        if (!projectToSend.projet_id) {
            this.showMessage('Cannot update: Missing project ID', true);
            return;
        }

        this.projectManagementService.updateProject(projectToSend.projet_id, projectToSend).subscribe({
            next: (response) => {
                this.showMessage('Project updated successfully! 🎉');
                setTimeout(() => this.router.navigate(["/project-management-page/projects-list"]), 2000);
            },
            error: (error) => {
                console.error('Update error:', error);
                this.showMessage(`Failed to update project: ${error.message || 'Please check your input'}`, true);
            }
        });
    }
  }

  private cleanDescription(desc: string): string {
    if (!desc) return '';
    // Remove any complex HTML if needed
    return desc.replace(/<[^>]*>/g, '').trim();
  }

  private handleError(err: HttpErrorResponse): void {
    console.error('Request payload:', this.project);
    console.error('Error response:', err.error);
    
    if (err.status === 400) {
      const message = err.error?.message || 'Invalid data. Please check:';
      alert(`${message}\n- Ensure all required fields are filled\n- Check date formats\n- Verify number fields`);
    } else {
      alert('Server error. Please try again later.');
    }
  }

  private validateProjectData(data: project): boolean {
    if (!data.projet_name) {
      alert('Project name is required');
      return false;
    }
    if (!data.start_date) {
      alert('Start date is required');
      return false;
    }
    if (!data.projectManager) {
      alert('Project manager is required');
      return false;
    }
    if (typeof data.budget_estime !== 'number' || isNaN(data.budget_estime)) {
      alert('Budget must be a valid number');
      return false;
    }
    if (typeof data.risque_retard !== 'number' || isNaN(data.risque_retard)) {
      alert('Risk value must be a valid number');
      return false;
    }
    return true;
  }

  private formatDate(date: Date | string | null): string {
    if (!date) return '';
    try {
      const d = new Date(date);
      return d.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    } catch {
      return String(date);
    }
  }

  private formatDateForSpring(date: string | Date): string {
    if (!date) return new Date().toISOString().split('T')[0];
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }

  clearForm(projectForm: NgForm): void {
    projectForm.reset();
    // Fix navigation path for cancel button
    this.router.navigate(['/project-management-page/projects-list']);
  }

  private initializeMap() {
    const lat = this.project.latitude || 36.8065;
    const lng = this.project.longitude || 10.1815;
    this.mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&t=m&markers=color:red|${lat},${lng}`;
    console.log('Map initialized with:', { lat, lng });
  }

  onMapClick(event: MessageEvent) {
    if (!event.origin.includes('google.com')) return;

    try {
        const data = event.data?.toString() || '';
        console.log('Map event data:', data);

        const patterns = [
            /ll=(-?\d+\.\d+),(-?\d+\.\d+)/,
            /q=(-?\d+\.\d+),(-?\d+\.\d+)/,
            /@(-?\d+\.\d+),(-?\d+\.\d+)/,
            /center=(-?\d+\.\d+),(-?\d+\.\d+)/
        ];

        for (const pattern of patterns) {
            const match = data.match(pattern);
            if (match) {
                const lat = Number(parseFloat(match[1]).toFixed(6));
                const lng = Number(parseFloat(match[2]).toFixed(6));

                if (!isNaN(lat) && !isNaN(lng)) {
                    this.project.latitude = lat;
                    this.project.longitude = lng;
                    console.log('Updated coordinates:', { lat, lng });
                    this.initializeMap();
                    break;
                }
            }
        }
    } catch (error: any) {
        console.error('Map click error:', error);
        this.showMessage(error.message || 'Failed to update location', true);
    }
  }
}
