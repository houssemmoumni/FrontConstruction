import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
    selector: 'app-worker-details-dialog',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatBadgeModule],
    template: `
        <div class="dialog-header">
            <h2 mat-dialog-title>
                <mat-icon class="team-icon">groups</mat-icon>
                Team Members
                <span class="member-count">{{data.length}}</span>
            </h2>
        </div>
        <mat-dialog-content>
            <div class="worker-list">
                <div *ngFor="let worker of data" class="worker-item">
                    <div class="worker-avatar" [style.background-color]="getRandomColor(worker.name)">
                        <span class="initial">{{worker.name.charAt(0)}}</span>
                    </div>
                    <div class="worker-info">
                        <h3>{{worker.name}}</h3>
                        <div class="role-badge">{{worker.role}}</div>
                    </div>
                </div>
            </div>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="close()">
                <mat-icon>close</mat-icon>
                Close
            </button>
        </mat-dialog-actions>
    `,
    styles: [`
        .dialog-header {
            background: #f5f5f5;
            margin: -24px -24px 0;
            padding: 16px 24px;
            border-bottom: 1px solid #e0e0e0;
        }

        h2 {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0;
            font-size: 20px;

            .team-icon {
                color: #1976d2;
            }

            .member-count {
                background: #1976d2;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 14px;
                margin-left: auto;
            }
        }

        .worker-list {
            padding: 16px 0;
        }

        .worker-item {
            display: flex;
            align-items: center;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 8px;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            
            &:hover {
                background-color: #f5f5f5;
                border-color: #e0e0e0;
                transform: translateX(4px);
            }
        }

        .worker-avatar {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            transition: transform 0.2s ease;
            
            &:hover {
                transform: scale(1.1);
            }
            
            .initial {
                font-size: 20px;
                font-weight: 500;
                color: white;
                text-transform: uppercase;
            }
        }

        .worker-info {
            flex: 1;

            h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 500;
                color: #333;
            }

            .role-badge {
                display: inline-block;
                margin-top: 4px;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                background: #e3f2fd;
                color: #1976d2;
                text-transform: uppercase;
            }
        }

        mat-dialog-actions {
            border-top: 1px solid #e0e0e0;
            margin: 16px -24px -24px;
            padding: 16px 24px;
        }

        :host-context(.dark-theme) {
            .dialog-header {
                background: #333;
                border-color: #444;
            }

            .worker-item {
                &:hover {
                    background-color: #333;
                    border-color: #444;
                }
            }

            .worker-info {
                h3 {
                    color: #fff;
                }

                .role-badge {
                    background: #1e3c5a;
                    color: #90caf9;
                }
            }

            mat-dialog-actions {
                border-color: #444;
            }
        }
    `]
})
export class WorkerDetailsDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<WorkerDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any[]
    ) {
        console.log('Worker Details Dialog Data:', data);
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
