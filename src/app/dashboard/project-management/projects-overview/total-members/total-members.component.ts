import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { WorkerService } from '../../../../services/worker.service';
import { Worker } from '../../../../models/worker.model';

@Component({
    selector: 'app-total-members',
    standalone: true,
    imports: [MatCardModule, CommonModule],
    templateUrl: './total-members.component.html',
    styleUrl: './total-members.component.scss'
})
export class TotalMembersComponent implements OnInit {
    totalWorkers: number = 0;
    recentWorkers: Worker[] = [];
    isLoading = true;

    constructor(
        public themeService: CustomizerSettingsService,
        private workerService: WorkerService
    ) {}

    ngOnInit() {
        this.loadWorkers();
    }

    private loadWorkers() {
        this.workerService.getAllWorkers().subscribe({
            next: (workers) => {
                this.totalWorkers = workers.length;
                this.recentWorkers = workers.slice(0, 5); // Get first 5 workers for display
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading workers:', error);
                this.isLoading = false;
            }
        });
    }

    getInitials(name: string): string {
        return name ? name.charAt(0).toUpperCase() : '?';
    }

    getAvatarColor(name: string): string {
        const colors = ['#1976d2', '#388e3c', '#d32f2f', '#7b1fa2', '#c2185b'];
        const index = name ? name.length % colors.length : 0;
        return colors[index];
    }
}