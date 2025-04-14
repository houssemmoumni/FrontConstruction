import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient!: Client;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  private pendingSubscriptions: string[] = []; // Queue for pending subscriptions

  constructor() { 
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = 'http://localhost:8066/chat-socket'; // Correct the URL format
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(url),
      reconnectDelay: 5000, // Enable auto-reconnect
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        console.log('✅ Connected to WebSocket');

        // Apply pending subscriptions
        this.pendingSubscriptions.forEach(roomId => this.subscribeToRoom(roomId));
        this.pendingSubscriptions = []; // Clear the queue after subscribing
      },
      onStompError: (frame) => {
        console.error('❌ WebSocket Error:', frame.headers['message']);
        console.error('Details:', frame.body);
      }
    });

    this.stompClient.activate();
  }

  joinRoom(roomId: string) {
    if (!this.isConnected()) {
      console.warn(`⚠️ WebSocket not connected yet. Adding room "${roomId}" to queue.`);
      this.pendingSubscriptions.push(roomId); // Add to the queue
      return;
    }
    
    this.subscribeToRoom(roomId);
  }

  private subscribeToRoom(roomId: string) {
    this.stompClient.subscribe(`/topic/${roomId}`, (message) => {
      const messageContent: ChatMessage = JSON.parse(message.body);
      const currentMessages = this.messageSubject.getValue();
      currentMessages.push(messageContent);

      this.messageSubject.next(currentMessages);
    });

    console.log(`📩 Subscribed to room: /topic/${roomId}`);
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    if (!this.isConnected()) {
      console.warn('⚠️ Cannot send message, WebSocket is not connected.');
      return;
    }

    this.stompClient.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(chatMessage)
    });

    console.log('📤 Message sent:', chatMessage);
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  private isConnected(): boolean {
    return this.stompClient && this.stompClient.connected;
  }
}
