import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor(private http: HttpClient) { 
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = 'http://localhost:8066/chat-socket';
    const socket = () => new SockJS(url); // Provide a factory function
    this.stompClient = Stomp.over(socket); // Use the factory function
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentMessage = this.messageSubject.getValue();
        currentMessage.push(messageContent);

        this.messageSubject.next(currentMessage);
      });
    }, this.handleError);
  }

  sendMessage(roomId: string, chatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('Chat not found:', error.message);
    } else {
      console.error('An error occurred:', error.message);
    }
    return throwError('Something went wrong; please try again later.');
  }
}