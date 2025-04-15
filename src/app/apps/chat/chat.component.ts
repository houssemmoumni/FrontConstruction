import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-chat',
    imports: [RouterLink, MatCardModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatSelectModule } from '@angular/material/select'; // Ajouté
// import { RouterLink } from '@angular/router';
// import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
// //import { WebSocketService } from '../../services/websocket.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//     selector: 'app-chat',
//     standalone: true,
//     imports: [
//         CommonModule,
//         FormsModule,
//         RouterLink,
//         MatCardModule,
//         MatMenuModule,
//         MatButtonModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatTabsModule,
//         MatSelectModule // Ajouté
//     ],
//     templateUrl: './chat.component.html',
//     styleUrls: ['./chat.component.scss']
// })
// export class ChatComponent implements OnInit, OnDestroy {
//     // Liste des utilisateurs disponibles
//     availableUsers = [
//         { id: 1, name: 'Marcia Baker', status: 'online', avatar: 'images/users/user1.jpg' },
//         { id: 2, name: 'Carolyn Barnes', status: 'offline', avatar: 'images/users/user2.jpg' },
//         { id: 3, name: 'Donna Miller', status: 'offline', avatar: 'images/users/user4.jpg' }
//     ];

//     selectedUserId: number | undefined;
//     currentChat: any = null;
//     messages: any[] = [];
//     newMessage = '';

//     private wsSubscription: any;

//     constructor(
//         public themeService: CustomizerSettingsService,
//         //private wsService: WebSocketService
//     ) {}

//     ngOnInit(): void {
//         // Sélectionner le premier utilisateur par défaut
//         if (this.availableUsers.length > 0) {
//             this.selectedUserId = this.availableUsers[0].id;
//             this.onUserSelected();
//         }
//     }

//     // onUserSelected(): void {
//     //     const selectedUser = this.availableUsers.find(user => user.id === this.selectedUserId);
//     //     if (selectedUser) {
//     //         this.selectChat(selectedUser);
//     //     }
//     // }

//     // selectChat(user: any): void {
//     //     // Nettoyer la précédente connexion
//     //   // this.wsService.disconnect();
//     //     this.wsSubscription?.unsubscribe();

//     //     // Mettre à jour le chat courant
//     //     this.currentChat = user;
//     //     this.messages = [];

//     //     // Simuler le chargement des messages
//     //     this.loadMockMessages(user.id);

//     //     // Se connecter au WebSocket
//     //     this.connectToWebSocket(user.id);
//     // }

//     private loadMockMessages(chatId: number): void {
//         // Remplacer par un appel à votre service API
//         this.messages = [
//             {
//                 id: 1,
//                 content: 'Have you learned the way to manage the testing?',
//                 timestamp: new Date(),
//                 senderId: chatId,
//                 isMe: false
//             },
//             {
//                 id: 2,
//                 content: 'Yes, I have checked the new system',
//                 timestamp: new Date(),
//                 senderId: 0, // Vous
//                 isMe: true
//             }
//         ];
//     }

//     // private connectToWebSocket(chatId: number): void {
//     //     this.wsSubscription = this.wsService.connect(chatId).subscribe({
//     //         next: (message: any) => this.handleIncomingMessage(message),
//     //         error: (err: any) => console.error('WebSocket error:', err)
//     //     });
//     // }

//     private handleIncomingMessage(message: any): void {
//         this.messages = [...this.messages, {
//             ...message,
//             timestamp: new Date(),
//             isMe: false
//         }];
//     }

//     sendMessage(): void {
//         if (!this.newMessage.trim() || !this.currentChat) return;

//         const messageData = {
//             chatRoomId: this.currentChat.id,
//             senderId: 0, // Votre ID utilisateur
//             content: this.newMessage
//         };

//       //  this.wsService.sendMessage(messageData);

//         // Ajouter le message envoyé à l'historique
//         this.messages.push({
//             id: Date.now(),
//             content: this.newMessage,
//             timestamp: new Date(),
//             senderId: 0,
//             isMe: true
//         });

//         this.newMessage = '';
//     }

//     // ngOnDestroy(): void {
//     //     this.wsService.disconnect();
//     //     this.wsSubscription?.unsubscribe();
//     // }
// }
