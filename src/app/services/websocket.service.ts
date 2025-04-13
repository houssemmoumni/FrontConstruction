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