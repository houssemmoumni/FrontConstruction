import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

interface DialogData {
    workers: any[];
    projectName: string;
}

@Component({
    selector: 'app-worker-details-dialog',
    templateUrl: './worker-details-dialog.component.html',
    styleUrls: ['./worker-details-dialog.component.scss'],
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatBadgeModule]
})
export class WorkerDetailsDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<WorkerDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        console.log('Dialog opened with data:', data);
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
}
