import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
    selector: 'app-project-qr-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, QRCodeComponent],
    template: `
        <h2 mat-dialog-title>
            <mat-icon>qr_code</mat-icon>
            Project QR Code - {{ data.project.projet_name }}
        </h2>
        <mat-dialog-content>
            <div class="qr-content">
                <qrcode
                    [qrdata]="qrData"
                    [width]="256"
                    [errorCorrectionLevel]="'M'"
                    [elementType]="'canvas'">
                </qrcode>
                <div class="project-info">
                    <p><strong>Status:</strong> {{ data.project.statut_projet }}</p>
                    <p><strong>Team:</strong> {{ data.project.workers?.length || 0 }} members</p>
                </div>
            </div>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="downloadQR()">
                <mat-icon>download</mat-icon>
                Download QR
            </button>
            <button mat-button (click)="dialogRef.close()">
                <mat-icon>close</mat-icon>
                Close
            </button>
        </mat-dialog-actions>
    `,
    styles: [`
        :host {
            display: block;
            padding: 20px;
        }

        h2 {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
        }

        .qr-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        qrcode {
            border: 1px solid #eee;
            padding: 10px;
            border-radius: 8px;
            background: white;
        }

        .project-info {
            text-align: center;
            p {
                margin: 5px 0;
            }
        }
    `]
})
export class ProjectQrDialogComponent {
    qrData: string;

    constructor(
        public dialogRef: MatDialogRef<ProjectQrDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { project: any }
    ) {
        // Format the data for the QR code in a human-readable format
        const project = data.project;
        const qrInfo = `
            Project Name: ${project.projet_name || 'N/A'}
            Description: ${project.projet_description || 'N/A'}
            Status: ${project.statut_projet || 'N/A'}
            Project Manager: ${project.projectManager || 'N/A'}
            Budget: ${project.budget_estime ? project.budget_estime.toFixed(2) : 'N/A'}
            Start Date: ${project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A'}
            End Date: ${project.end_date ? new Date(project.end_date).toLocaleDateString() : 'N/A'}
            
            Team Members (${project.workers?.length || 0}):
            ${project.workers?.map((w: any) => `  - ${w.name} (${w.role})`).join('\n') || '  No members'}
        `;
        this.qrData = qrInfo.trim();
        console.log('QR Data:', this.qrData);
    }

    downloadQR() {
        const canvas = document.querySelector('qrcode canvas') as HTMLCanvasElement;
        if (canvas instanceof HTMLCanvasElement) {  
            const link = document.createElement('a');
            link.download = `project-${this.data.project.projet_id}-qr.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } else {
            console.error('QR code canvas not found');
        }
    }
}
