import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkingScheduleComponent } from './working-schedule/working-schedule.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProjectManagementService } from '../../services/project-management.service';
import { project } from '../../models/project.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventDetailsSnackbarComponent } from '../../shared/components/event-details-snackbar/event-details-snackbar.component';

@Component({
    selector: 'app-calendar',
    imports: [RouterLink, WorkingScheduleComponent, MatButtonModule, MatMenuModule, MatCardModule, FullCalendarModule, MatSnackBarModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dayMaxEvents: true,
        weekends: true,
        events: [], 
        eventClick: this.handleEventClick.bind(this),
        plugins: [dayGridPlugin],
        eventContent: (arg) => {
            const workers = arg.event.extendedProps['workers'] || [];
            return {
                html: `
                    <div class="fc-event-main-content">
                        <div class="event-title">${arg.event.title}</div>
                        <div class="event-details">
                            <span class="status-badge">${arg.event.extendedProps['status']}</span>
                            <span class="worker-count">${workers.length} members</span>
                        </div>
                    </div>
                `
            };
        }
    };

    constructor(
        public themeService: CustomizerSettingsService,
        private projectService: ProjectManagementService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loadProjectEvents();
    }

    private loadProjectEvents() {
        this.projectService.getAllProjects().subscribe({
            next: (projects: project[]) => {
                console.log('Loading projects for calendar:', projects);
                const events = projects.map(project => ({
                    id: project.projet_id?.toString(),
                    title: project.projet_name,
                    start: new Date(project.start_date),
                    end: project.end_date ? new Date(project.end_date) : undefined,
                    allDay: true,
                    extendedProps: {
                        description: project.projet_description,
                        status: project.statut_projet,
                        manager: project.projectManager,
                        workers: project.workers || [],
                        budget: project.budget_estime
                    },
                    backgroundColor: this.getStatusColor(project.statut_projet),
                    borderColor: this.getStatusColor(project.statut_projet),
                    textColor: '#ffffff'
                }));

                this.calendarOptions = {
                    ...this.calendarOptions,
                    events: events
                };
                console.log('Calendar events loaded:', events);
            },
            error: (error) => {
                console.error('Error loading project events:', error);
            }
        });
    }

    private getStatusColor(status: string): string {
        switch (status) {
            case 'EN_COURS': return '#4CAF50';     // Green
            case 'PLANIFICATION': return '#2196F3'; // Blue
            case 'TERMINÉ': return '#9C27B0';      // Purple
            case 'ANNULE': return '#F44336';       // Red
            default: return '#757575';             // Grey
        }
    }

    handleEventClick(info: any) {
        const event = info.event;
        const status = event.extendedProps.status;
        const statusColor = this.getStatusColor(status);
        const workers = event.extendedProps.workers || [];

        const workersList = workers.length 
            ? `<div class="event-workers">
                <strong>Team Members (${workers.length}):</strong>
                <ul>${workers.map((w: { name: any; role: any; }) => `<li>${w.name} - ${w.role}</li>`).join('')}</ul>
               </div>`
            : '';

        const message = `
            <div class="event-header">
                <h3>${event.title}</h3>
                <span class="status-badge" style="background-color: ${statusColor}20; color: ${statusColor}">
                    ${status}
                </span>
            </div>
            <div class="event-body">
                <div class="event-info">
                    <i class="ri-user-3-line"></i>
                    <span><strong>Manager:</strong> ${event.extendedProps.manager}</span>
                </div>
                ${event.extendedProps.description ? `
                    <div class="event-info">
                        <i class="ri-file-text-line"></i>
                        <span><strong>Description:</strong> ${event.extendedProps.description}</span>
                    </div>
                ` : ''}
                <div class="event-info">
                    <i class="ri-calendar-line"></i>
                    <span><strong>Period:</strong> ${this.formatDate(event.start)} - ${event.end ? this.formatDate(event.end) : 'Ongoing'}</span>
                </div>
                ${workersList}
            </div>
        `;

        this.snackBar.openFromComponent(EventDetailsSnackbarComponent, {
            duration: 8000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['event-details-snackbar', 'notification-animation'],
            data: { message }
        });
    }

    private formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}