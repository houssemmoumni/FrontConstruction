import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CommentResponse } from '../models/comment-response';
import { Client, Message, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService  {

  private stompClient!: Client;
  private commentSubject: Subject<any> = new Subject<any>();

  connect(taskId:number): void {
    const socket = new SockJS('http://localhost:8051/ws'); // Adjust URL to your Spring Boot WebSocket endpoint
    this.stompClient = Stomp.over(() => socket);

    this.stompClient.onConnect = () => {
      console.log('WebSocket connected');

      this.stompClient.subscribe(`/topic/tasks/${taskId}/comments`, (message: Message) => {
        if (message.body) {
          this.commentSubject.next(JSON.parse(message.body));
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker error:', frame.headers['message']);
      console.error('Details:', frame.body);
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }

  onComment(): Observable<any> {
    return this.commentSubject.asObservable();
  }
  // private stompClient: Client | null = null;
  // private commentSubject = new Subject<CommentResponse>();
  // public commentStream$ = this.commentSubject.asObservable();

  // private readonly isBrowser: boolean;
  // private connectionPromise: Promise<void> | null = null;
  // private _isConnected = false; // Renamed from isConnected
  // private pendingMessages: CommentResponse[] = [];
  // private maxRetryAttempts = 5;
  // private retryDelay = 300;

  // constructor(@Inject(PLATFORM_ID) platformId: Object) {
  //   this.isBrowser = isPlatformBrowser(platformId);
  // }

  // public async connect(taskId: number): Promise<void> {
  //   if (!this.isBrowser) return;

  //   if (!this.connectionPromise) {
  //     this.connectionPromise = this.initializeWebSocket(taskId);
  //   }

  //   return this.connectionPromise;
  // }

  // private async initializeWebSocket(taskId: number): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     try {
  //       this.stompClient = new Client({
  //         brokerURL: 'ws://localhost:8222/ws',
  //         debug: (msg: string) => console.debug('[WebSocket]', msg),
  //         reconnectDelay: 5000,
  //         heartbeatIncoming: 4000,
  //         heartbeatOutgoing: 4000,
  //       });

  //       this.stompClient.onConnect = () => {
  //         console.log('✅ WebSocket connected');
  //         this._isConnected = true;
  //         this.subscribeToComments(taskId);
  //         this.processPendingMessages();
  //         resolve();
  //       };

  //       this.stompClient.onStompError = (frame) => {
  //         console.error('❌ STOMP protocol error:', frame);
  //         reject(frame);
  //       };

  //       this.stompClient.onWebSocketError = (event) => {
  //         console.error('❌ WebSocket connection error:', event);
  //         reject(event);
  //       };

  //       this.stompClient.onDisconnect = () => {
  //         console.log('🔌 WebSocket disconnected');
  //         this._isConnected = false;
  //       };

  //       this.stompClient.activate();
  //     } catch (error) {
  //       console.error('WebSocket initialization failed:', error);
  //       reject(error);
  //     }
  //   });
  // }

  // private subscribeToComments(taskId: number): void {
  //   if (!this.stompClient) return;

  //  const topic = `/topic/tasks/${taskId}/comments`;

  //   this.stompClient.subscribe(topic, (message: IMessage) => {
  //     try {
  //       const comment: CommentResponse = JSON.parse(message.body);
  //       this.commentSubject.next(comment);
  //     } catch (error) {
  //       console.error('Error parsing message:', error);
  //     }
  //   });
  // }

  // public isConnected(): boolean {
  //   return this._isConnected && this.stompClient?.connected === true;
  // }

  // public sendComment(comment: CommentResponse): void {
  //   if (this.isConnected()) {
  //     this.stompClient?.publish({
  //       destination: `/app/tasks/${comment.taskId}/comments`,
  //       body: JSON.stringify(comment),
  //     });
  //   } else {
  //     console.warn('WebSocket not connected. Queueing message...');
  //     this.pendingMessages.push(comment);
  //   }
  // }

  // private processPendingMessages(): void {
  //   while (this.pendingMessages.length > 0 && this.isConnected()) {
  //     const message = this.pendingMessages.shift();
  //     if (message) {
  //       this.sendComment(message);
  //     }
  //   }
  // }

  // public disconnect(): void {
  //   if (this.isBrowser && this.stompClient?.active) {
  //     this.stompClient.deactivate().then(() => {
  //       this.stompClient = null;
  //       this.connectionPromise = null;
  //       this._isConnected = false;
  //       this.pendingMessages = [];
  //     });
  //   }
  // }

  // ngOnDestroy(): void {
  //   this.disconnect();
  //   this.commentSubject.complete();
  // }
}
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
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Client, IMessage } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { HttpClient } from '@angular/common/http';
// import { Notification } from '../models/incident.model';

// @Injectable({ providedIn: 'root' })
// export class WebSocketService {
//   private stompClient!: Client;
//   private notificationSubject = new BehaviorSubject<Notification | null>(null);
//   private connectionStatus = new BehaviorSubject<boolean>(false);
//   private readonly endpoint = 'http://localhost:8065/ws-notifications';
//   private readonly apiUrl = 'http://localhost:8065/api/notifications';

//   constructor(private http: HttpClient) {
//     this.initializeConnection();
//   }

//   private initializeConnection(): void {
//     try {
//       const socket = new SockJS(this.endpoint);
//       this.stompClient = new Client({
//         webSocketFactory: () => socket,
//         reconnectDelay: 5000,
//         heartbeatIncoming: 4000,
//         heartbeatOutgoing: 4000,
//         debug: (str) => console.log('STOMP:', str),
//         onConnect: () => {
//           this.connectionStatus.next(true);
//           this.subscribeToNotifications();
//         },
//         onStompError: (frame) => {
//           console.error('Broker reported error:', frame.headers['message']);
//           this.connectionStatus.next(false);
//         },
//         onDisconnect: () => {
//           this.connectionStatus.next(false);
//         }
//       });
//       this.stompClient.activate();
//     } catch (error) {
//       console.error('WebSocket initialization error:', error);
//       this.connectionStatus.next(false);
//     }
//   }

//   private subscribeToNotifications(): void {
//     if (!this.stompClient.connected) return;

//     this.stompClient.subscribe('/topic/notifications', (message: IMessage) => {
//       try {
//         const payload = JSON.parse(message.body);
//         console.log('Raw notification payload:', payload);

//         // Determine the source based on payload content
//         const source = payload.incident ? 'incident' : 'incidentReport';
//         const incidentData = payload.incident || payload.incidentReport;

//         const notification: Notification = {
//           id: payload.id || 0,
//           message: payload.message || 'New incident reported',
//           notification_date: this.normalizeDate(payload.notification_date || new Date()),
//           is_read: payload.is_read || false,
//           severity: payload.severity || 'MEDIUM',
//           receiverId: payload.receiverId || 0,
//           source: source, // Include the required source property
//           incident: incidentData ? {
//             id: incidentData.id,
//             description: incidentData.description || '',
//             reportDate: this.normalizeDate(incidentData.reportDate),
//             status: incidentData.status || 'DECLARED',
//             severity: incidentData.severity || 'MEDIUM',
//             reporterName: incidentData.reporterName || 'Anonymous',
//             projectId: incidentData.projectId || 0,
//             projectName: incidentData.projectName || 'Unknown Project'
//           } : undefined,
//           incidentReport: source === 'incidentReport' ? incidentData : undefined
//         };

//         console.log('Processed notification:', notification);
//         this.notificationSubject.next(notification);
//       } catch (error) {
//         console.error('Error processing notification:', error, message.body);
//       }
//     });
//   }

//   private normalizeDate(date: any): string {
//     if (!date) return new Date().toISOString();
//     if (typeof date === 'string') return date;
//     if (date instanceof Date) return date.toISOString();
//     try {
//       const parsed = new Date(date);
//       return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
//     } catch {
//       return new Date().toISOString();
//     }
//   }

//   getNotifications(): Observable<Notification | null> {
//     return this.notificationSubject.asObservable();
//   }

//   getConnectionStatus(): Observable<boolean> {
//     return this.connectionStatus.asObservable();
//   }

//   getUserNotifications(userId: number): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}`).pipe(
//       map((notifs: Notification[]) => notifs.map((n: Notification) => ({
//         ...n,
//         notification_date: this.normalizeDate(n.notification_date),
//         incident: n.incident ? {
//           ...n.incident,
//           reportDate: this.normalizeDate(n.incident.reportDate)
//         } : undefined
//       }))
//     ));
//   }

//   getUnreadNotifications(receiverId: number): Observable<Notification[]> {
//     return this.http.get<Notification[]>(`${this.apiUrl}/unread/${receiverId}`).pipe(
//       map((notifs: Notification[]) => notifs.map((n: Notification) => ({
//         ...n,
//         notification_date: this.normalizeDate(n.notification_date),
//         incident: n.incident ? {
//           ...n.incident,
//           reportDate: this.normalizeDate(n.incident.reportDate)
//         } : undefined
//       }))
//     ));
//   }

//   markAsRead(id: number): Observable<any> {
//     return this.http.patch(`${this.apiUrl}/${id}/read`, {});
//   }

//   markAllAsRead(receiverId: number): Observable<any> {
//     return this.http.patch(`${this.apiUrl}/read-all/${receiverId}`, {});
//   }

//   clearAllNotifications(receiverId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/clear-all/${receiverId}`);
//   }

//   disconnect(): void {
//     if (this.stompClient?.connected) {
//       this.stompClient.deactivate();
//     }
//   }
// }
