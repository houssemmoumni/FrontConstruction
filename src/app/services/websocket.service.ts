// import { Injectable, OnDestroy } from '@angular/core';
// import * as Stomp from 'stompjs';
// import SockJS from 'sockjs-client';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class WebSocketService implements OnDestroy {
//   private stompClient: Stomp.Client | null = null;
//   private connectionSubject = new BehaviorSubject<boolean>(false);
//   private messageSubject = new Subject<any>();
//   private reconnectAttempts = 0;
//   private readonly MAX_RECONNECT_ATTEMPTS = 5;
//   private readonly RECONNECT_DELAY = 5000;

//   // Utilisez cette URL pour SockJS
//   private readonly WS_ENDPOINT = 'http://localhost:8093/Communication_Service/ws';

//   public connectionStatus$ = this.connectionSubject.asObservable();

// constructor() {
//     // Enable debugging for Stomp.js if needed
//     if (this.stompClient) {
//         this.stompClient.debug = (msg: string) => console.log(msg);
//     }
// }

//   connect(chatRoomId: number): Observable<any> {
//     if (this.stompClient?.connected) {
//       return this.messageSubject.asObservable();
//     }

//     // Solution 1: Utilisation de SockJS (recommandé avec Spring)
//     const socket = new SockJS(this.WS_ENDPOINT);
//     this.stompClient = Stomp.over(socket);

//     // Solution alternative: WebSocket natif (décommentez si nécessaire)
//     // this.stompClient = Stomp.client('ws://localhost:8093/Communication_Service/ws');

//     const headers = {
//       'chatRoomId': chatRoomId.toString()
//     };

//     this.stompClient.connect(headers,
//       () => this.onConnectSuccess(chatRoomId),
//       (error) => this.onConnectError(error, chatRoomId)
//     );

//     return this.messageSubject.asObservable();
//   }

//   private onConnectSuccess(chatRoomId: number): void {
//     this.reconnectAttempts = 0;
//     this.connectionSubject.next(true);
//     this.subscribeToChatRoom(chatRoomId);
//     console.log('WebSocket connected successfully');
//   }

//   private onConnectError(error: any, chatRoomId: number): void {
//     console.error('Connection error:', error);
//     this.connectionSubject.next(false);
//     this.scheduleReconnect(chatRoomId);
//   }

//   private subscribeToChatRoom(chatRoomId: number): void {
//     this.stompClient?.subscribe(
//       `/topic/chatroom/${chatRoomId}`,
//       (message) => {
//         try {
//           const parsedMessage = JSON.parse(message.body);
//           this.messageSubject.next(parsedMessage);
//         } catch (e) {
//           console.error('Error parsing message:', e);
//         }
//       },
//       { 'chatRoomId': chatRoomId.toString() }
//     );
//   }

//   private scheduleReconnect(chatRoomId: number): void {
//     if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
//       this.reconnectAttempts++;
//       setTimeout(() => {
//         console.log(`Reconnection attempt ${this.reconnectAttempts}`);
//         this.connect(chatRoomId);
//       }, this.RECONNECT_DELAY);
//     } else {
//       console.warn('Max reconnection attempts reached');
//     }
//   }

//   sendMessage(destination: string, message: any): void {
//     if (!this.stompClient?.connected) {
//       console.error('Cannot send message - not connected');
//       return;
//     }

//     this.stompClient.send(
//       destination,
//       {},
//       JSON.stringify(message)
//     );
//   }

//   disconnect(): void {
//     if (this.stompClient?.connected) {
//       this.stompClient.disconnect(() => {
//         this.connectionSubject.next(false);
//         console.log('Disconnected');
//       });
//     }
//     this.stompClient = null;
//   }

//   ngOnDestroy(): void {
//     this.disconnect();
//     this.messageSubject.complete();
//     this.connectionSubject.complete();
//   }
// }
