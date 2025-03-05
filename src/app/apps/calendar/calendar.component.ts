import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkingScheduleComponent } from './working-schedule/working-schedule.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProjectManagementService } from '../../services/project-management.service';
import { project } from '../../models/project.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventDetailsSnackbarComponent } from '../../shared/components/event-details-snackbar/event-details-snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { WorkerDetailsDialogComponent } from '../../components/worker-details-dialog/worker-details-dialog.component';

@Component({
    selector: 'app-calendar',
    imports: [RouterLink, WorkingScheduleComponent, MatButtonModule, MatMenuModule, MatCardModule, FullCalendarModule, MatSnackBarModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        dayMaxEvents: true,
        weekends: true,
        events: (info, successCallback, failureCallback) => {
            this.projectService.getAllProjects().subscribe({
                next: (projects) => {
                    const events = projects.map(project => ({
                        title: `${project.projet_name} (${project.workers?.length || 0} 👥)`,
                        date: project.start_date,
                        backgroundColor: this.getStatusColor(project.statut_projet),
                        borderColor: this.getStatusColor(project.statut_projet),
                        extendedProps: {
                            workers: project.workers || [],
                            projectName: project.projet_name,
                            status: project.statut_projet,
                            description: project.projet_description
                        }
                    }));
                    successCallback(events);
                },
                error: (error) => {
                    console.error('Error:', error);
                    failureCallback(error);
                }
            });
        },
        eventClick: this.handleEventClick.bind(this),
        plugins: [dayGridPlugin],
        eventDidMount: (info) => {
            // Add tooltip with worker count
            const workers = info.event.extendedProps['workers'];
            const count = workers?.length || 0;
            info.el.title = `${count} team member${count !== 1 ? 's' : ''}\nClick to view details`;
        },
        eventContent: (arg) => {
            const workerCount = arg.event.extendedProps['workers']?.length || 0;
            return {
                html: `
                    <div class="fc-event-main-content">
                        <div class="event-title">${arg.event.extendedProps['projectName']}</div>
                        <div class="event-workers">
                            <span class="worker-count">${workerCount} 👥</span>
                        </div>
                    </div>
                `
            };
        }
    };

    constructor(
        public themeService: CustomizerSettingsService,
        private projectService: ProjectManagementService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.loadProjectEvents();
    }

    private loadProjectEvents() {
        this.projectService.getAllProjects().subscribe({
            next: (projects: project[]) => {
                const events = projects.map(project => ({
                    title: project.projet_name,
                    start: new Date(project.start_date),
                    end: project.end_date ? new Date(project.end_date) : undefined,
                    extendedProps: {
                        description: project.projet_description,
                        status: project.statut_projet,
                        manager: project.projectManager
                    },
                    backgroundColor: this.getStatusColor(project.statut_projet),
                    borderColor: this.getStatusColor(project.statut_projet)
                }));

                this.calendarOptions.events = events;
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

    handleEventClick(clickInfo: EventClickArg) {
        const event = clickInfo.event;
        const workers = event.extendedProps['workers'];
        const projectName = event.extendedProps['projet_name'];
        
        this.dialog.open(WorkerDetailsDialogComponent, {
            width: '500px',
            data: {
                workers: workers || [],
                projectName: projectName
            },
            panelClass: 'worker-details-dialog'
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