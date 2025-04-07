import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { IncidentService } from '../services/incident.service';
import { Project } from '../models/project.model';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebSocketService } from '../services/websocket.service';
import { Subscription, timer } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AssignIncidentComponent } from '../assign-incident/assign-incident.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Notification, IncidentReport } from '../models/incident.model';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ConfirmationDialogComponent,
    DatePipe
  ],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProjectComponent implements OnInit, OnDestroy, AfterViewInit {
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
  notifications: Notification[] = [];
  unreadCount = 0;
  hasNewNotification = false;
  isConnected = false;
  showNotificationCenter = false;
  isLoading = false;
  private notificationSub: Subscription = new Subscription();
  private connectionSub: Subscription = new Subscription();
  private shakeTimerSub?: Subscription;

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar,
    private wsService: WebSocketService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.setupWebSocket();
    this.loadAllNotifications();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
    this.connectionSub.unsubscribe();
    if (this.shakeTimerSub) this.shakeTimerSub.unsubscribe();
  }

  private loadProjects(): void {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data.map(p => ({
          ...p,
          image: p.image ? 'data:image/jpeg;base64,' + p.image : null
        }));
        this.filteredProjects = [...this.projects];
        this.updatePaginatedProjects();
        this.isLoading = false;
      },
      error: (err) => {
        this.showError('Failed to load projects');
        this.isLoading = false;
      }
    });
  }

  private loadAllNotifications(): void {
    const receiverId = 1;
    this.wsService.getUserNotifications(receiverId).subscribe({
      next: (notifs) => {
        this.notifications = notifs.map(n => ({
          ...n,
          notification_date: n.notification_date,
          is_read: n.is_read,
          incident: this.parseIncidentData(n)
        }));
        this.updateUnreadCount();
      },
      error: (err) => console.error('Failed to load notifications', err)
    });
  }

  private parseIncidentData(n: Notification): IncidentReport | undefined {
    const incident = n.incident || n.incidentReport;
    if (!incident) return undefined;

    return {
      ...incident,
      id: incident.id || 0,
      reportDate: incident.reportDate || '',
      reporterName: incident.reporterName || 'Anonymous',
      projectName: incident.projectName || 'Unknown Project'
    };
  }

  private updateUnreadCount(): void {
    this.unreadCount = this.notifications.filter(n => !n.is_read).length;
  }

  private setupWebSocket(): void {
    this.connectionSub = this.wsService.getConnectionStatus().subscribe(
      status => this.isConnected = status
    );

    this.notificationSub = this.wsService.getNotifications().subscribe({
      next: (notification) => {
        if (notification) {
          const exists = this.notifications.some(n => n.id === notification.id);
          if (!exists) {
            const parsedNotification: Notification = {
              ...notification,
              is_read: false,
              notification_date: notification.notification_date,
              incident: this.parseIncidentData(notification)
            };

            this.notifications.unshift(parsedNotification);
            this.updateUnreadCount();
            this.triggerShake();
            this.showNotificationToast(parsedNotification);
          }
        }
      }
    });
  }

  async handleNotificationClick(notification: Notification): Promise<void> {
    if (!notification.incident) {
      this.snackBar.open('No incident data available', 'Close', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Assign Incident',
        message: `Do you want to assign this incident (ID: ${notification.incident.id}) to a technician?`,
        incident: notification.incident
      }
    });

    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      await this.markAsRead(notification);
      this.openAssignDialog(notification.incident);
    } else {
      await this.markAsRead(notification);
    }
  }

  openAssignDialog(incidentData: IncidentReport): void {
    const dialogRef = this.dialog.open(AssignIncidentComponent, {
      width: '600px',
      data: { incident: incidentData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.notifications.findIndex(n =>
          n.incident?.id === result.id
        );
        if (index !== -1) {
          this.notifications[index].incident = result;
          this.cdr.detectChanges();
        }
      }
    });
  }

  markAsRead(notification: Notification): Promise<void> {
    return new Promise((resolve) => {
      if (!notification.is_read && notification.id) {
        this.wsService.markAsRead(notification.id).subscribe({
          next: () => {
            notification.is_read = true;
            this.updateUnreadCount();
            resolve();
          },
          error: (err) => {
            this.showError('Failed to update notification');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  markAllAsRead(): void {
    const receiverId = 1;
    this.wsService.markAllAsRead(receiverId).subscribe({
      next: () => {
        this.notifications.forEach(n => n.is_read = true);
        this.unreadCount = 0;
        this.snackBar.open('All notifications marked as read', 'Close', { duration: 2000 });
      },
      error: (err) => this.showError('Failed to update notifications')
    });
  }

  clearAll(): void {
    const receiverId = 1;
    this.wsService.clearAllNotifications(receiverId).subscribe({
      next: () => {
        this.notifications = [];
        this.unreadCount = 0;
        this.snackBar.open('All notifications cleared', 'Close', { duration: 2000 });
      },
      error: (err) => this.showError('Failed to clear notifications')
    });
  }

  openNotificationCenter(): void {
    this.showNotificationCenter = true;
  }

  getSeverityIcon(severity: string): string {
    switch(severity) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      default: return 'notifications';
    }
  }

  private triggerShake(): void {
    this.hasNewNotification = true;
    if (this.shakeTimerSub) this.shakeTimerSub.unsubscribe();
    this.shakeTimerSub = timer(1000).subscribe(() => {
      this.hasNewNotification = false;
    });
  }

  private showNotificationToast(notification: Notification): void {
    const time = new Date(notification.notification_date).toLocaleTimeString();
    const message = `${notification.message} (${time})`;

    this.snackBar.open(message, 'Assign', {
      duration: 5000,
      panelClass: [`${notification.severity.toLowerCase()}-snackbar`],
      verticalPosition: 'top'
    }).onAction().subscribe(() => {
      if (notification.incident) {
        this.handleNotificationClick(notification);
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

  private updatePaginatedProjects(): void {
    const start = this.currentPage * this.pageSize;
    this.paginatedProjects = this.filteredProjects.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProjects();
  }

  editProject(project: Project): void {
    this.currentProject = { ...project };
    this.previewImage = project.image || null;
    this.isEditing = true;
  }

  deleteProject(project: Project): void {
    if (!project.id) return;
    if (confirm(`Delete project "${project.name}"?`)) {
      this.projectService.deleteProject(project.id).subscribe({
        next: () => {
          this.loadProjects();
          this.showSuccess('Project deleted');
        },
        error: (err) => {
          this.showError('Failed to delete project');
        }
      });
    }
  }

  togglePublish(project: Project): void {
    if (!project.id) return;
    const action = project.published
      ? this.projectService.unpublishProject(project.id)
      : this.projectService.publishProject(project.id);

    action.subscribe({
      next: () => {
        project.published = !project.published;
        this.showSuccess(`Project ${project.published ? 'published' : 'unpublished'}`);
      },
      error: (err) => {
        this.showError(`Failed to ${project.published ? 'unpublish' : 'publish'} project`);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.currentProject.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.previewImage = null;
    this.currentProject.image = null;
    this.selectedFile = null;
  }

  submitForm(): void {
    if (!this.currentProject.name?.trim()) {
      this.showError('Project name is required');
      return;
    }
    if (!this.currentProject.location?.trim()) {
      this.showError('Project location is required');
      return;
    }

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
        this.showSuccess(`Project ${this.currentProject.id ? 'updated' : 'added'}`);
      },
      error: (err) => {
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

  forceAssign(incidentId: number): void {
    if (!incidentId) {
      this.snackBar.open('Invalid incident ID', 'Close', { duration: 3000 });
      return;
    }

    this.incidentService.getIncidentById(incidentId).subscribe({
      next: (incident) => {
        this.openAssignDialog(incident);
      },
      error: (err) => {
        this.snackBar.open('Failed to load incident details', 'Close', { duration: 3000 });
      }
    });
  }

  assignIncident(incident: IncidentReport): void {
    if (!incident) {
      this.snackBar.open('Invalid incident data', 'Close', { duration: 3000 });
      return;
    }
    this.openAssignDialog(incident);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
