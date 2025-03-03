import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent {
  @Input() notifications: any[] = []; // Liste des notifications
  isOpen: boolean = false; // Contrôle l'état de la boîte déroulante

  // Ouvre ou ferme la boîte de notifications
  toggleNotifications() {
    this.isOpen = !this.isOpen;
  }

  // Retourne le nombre de notifications non lues
  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }
}
