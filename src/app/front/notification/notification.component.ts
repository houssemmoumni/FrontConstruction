import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':enter, :leave', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class NotificationComponent {
  @Input() type: 'success' | 'error' = 'success'; // Type de notification
  @Input() message: string = ''; // Message de la notification
  @Input() link: string = ''; // Lien vers l'entretien (si acceptation)

  get icon(): string {
    return this.type === 'success' ? '🎉' : '😢';
  }

  get bgColor(): string {
    return this.type === 'success' ? 'bg-green-100' : 'bg-red-100';
  }

  get textColor(): string {
    return this.type === 'success' ? 'text-green-800' : 'text-red-800';
  }
}
