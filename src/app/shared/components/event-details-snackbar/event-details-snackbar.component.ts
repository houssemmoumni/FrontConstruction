import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-event-details-snackbar',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="event-details" [innerHTML]="sanitizedHtml"></div>
        <button class="close-button" (click)="close()">
            <i class="ri-close-line"></i>
        </button>
    `,
    styles: [`
        :host {
            display: block;
        }
        .close-button {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            color: white;
            opacity: 0.7;
            cursor: pointer;
            padding: 4px;
            &:hover {
                opacity: 1;
            }
        }
    `]
})
export class EventDetailsSnackbarComponent {
    sanitizedHtml: any;

    constructor(
        @Inject(MAT_SNACK_BAR_DATA) private data: any,
        private snackBarRef: MatSnackBarRef<EventDetailsSnackbarComponent>,
        private sanitizer: DomSanitizer
    ) {
        this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(this.data.message);
    }

    close() {
        this.snackBarRef.dismiss();
    }
}
