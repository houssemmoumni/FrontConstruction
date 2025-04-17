import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

interface DialogData {
    workers: any[];
    projectName: string;
    status?: string;  // Add status to get project color
}

@Component({
    selector: 'app-worker-details-dialog',
    templateUrl: './worker-details-dialog.component.html',
    styleUrls: ['./worker-details-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatBadgeModule]
})
export class WorkerDetailsDialogComponent {
    projectColor: string;

    constructor(
        private dialogRef: MatDialogRef<WorkerDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        console.log('Dialog opened with data:', data);
        this.projectColor = this.getStatusColor(data.status || '');
    }

    close(): void {
        this.dialogRef.close();
    }

    getRandomColor(name: string): string {
        const colors = [
            '#1976d2', '#388e3c', '#d32f2f', '#7b1fa2',
            '#c2185b', '#0288d1', '#303f9f', '#ef6c00'
        ];
        const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[index % colors.length];
    }

    private getStatusColor(status: string): string {
        switch (status) {
            case 'EN_COURS': return '#4CAF50';     // Green
            case 'PLANIFICATION': return '#2196F3'; // Blue
            case 'TERMINÉ': return '#9C27B0';      // Purple
            case 'ANNULE': return '#F44336';       // Red
            default: return '#1976d2';             // Default blue
        }
    }
}
