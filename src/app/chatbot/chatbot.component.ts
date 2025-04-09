// chatbot.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
    isChatOpen = false;
    messages: {text: string, isUser: boolean}[] = [];
    userInput = '';
    isLoading = false;
    isReclamationMode = false;

    constructor(private http: HttpClient) {
      this.addBotMessage('Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider ?');
    }

    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      if (this.isChatOpen) {
        this.scrollToBottom();
      }
    }

    private addUserMessage(text: string) {
      this.messages.push({ text, isUser: true });
      this.scrollToBottom();
    }

    private addBotMessage(text: string) {
      this.messages.push({ text, isUser: false });
      this.scrollToBottom();
    }

    toggleReclamationMode() {
      this.isReclamationMode = !this.isReclamationMode;
      if (this.isReclamationMode) {
        this.addBotMessage('Mode réclamation activé. Posez-moi vos questions sur les réclamations.');
      } else {
        this.addBotMessage('Retour au mode conversation générale.');
      }
    }

    sendMessage(event: Event) {
      event.preventDefault();
      const question = this.userInput.trim();
      if (!question) return;

      this.addUserMessage(question);
      this.userInput = '';
      this.isLoading = true;

      if (this.isReclamationMode) {
        this.sendReclamationHelpRequest(question);
      } else {
        this.sendGeneralChatRequest(question);
      }
    }

    private sendGeneralChatRequest(question: string) {
      this.http.post<any>(
        'http://localhost:8093/Communication_Service/api/chatbot/ask',
        { question },
        { responseType: 'json' }
      ).pipe(
        catchError(error => {
          console.error('API Error:', error);
          return of({ error: "Désolé, une erreur est survenue" });
        })
      ).subscribe({
        next: (response) => {
          this.isLoading = false;
          const botResponse = this.extractResponse(response);
          this.addBotMessage(botResponse);
        },
        error: (err) => {
          this.isLoading = false;
          this.addBotMessage("Désolé, le service est temporairement indisponible");
        }
      });
    }

    private sendReclamationHelpRequest(question: string) {
      this.http.post<any>(
        'http://localhost:8093/Communication_Service/api/chatbot/reclamation-help',
        { userQuery: question },
        { responseType: 'json' }
      ).pipe(
        catchError(error => {
          console.error('API Error:', error);
          return of({ error: "Désolé, une erreur est survenue lors de la demande d'aide pour les réclamations" });
        })
      ).subscribe({
        next: (response) => {
          this.isLoading = false;
          const botResponse = this.extractResponse(response);
          this.addBotMessage(botResponse);
        },
        error: (err) => {
          this.isLoading = false;
          this.addBotMessage("Désolé, le service d'aide aux réclamations est temporairement indisponible");
        }
      });
    }

    private extractResponse(response: any): string {
      if (typeof response === 'string') return response;

      const possibleProperties = ['response', 'reponse', 'message', 'answer', 'text', 'content'];
      for (const prop of possibleProperties) {
        if (response[prop]) {
          return response[prop];
        }
      }

      if (Array.isArray(response)) {
        return response.join('\n');
      }

      try {
        return JSON.stringify(response, null, 2);
      } catch {
        return "Réponse non reconnue du serveur";
      }
    }

    private scrollToBottom() {
      setTimeout(() => {
        const chatbox = document.querySelector('.chatbox');
        if (chatbox) {
          chatbox.scrollTop = chatbox.scrollHeight;
        }
      }, 100);
    }
  }
