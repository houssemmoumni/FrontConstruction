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

  constructor(private http: HttpClient) {
    this.addBotMessage('Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider ?');
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  private addUserMessage(text: string) {
    this.messages.push({ text, isUser: true });
  }

  private addBotMessage(text: string) {
    this.messages.push({ text, isUser: false });
  }

  sendMessage(event: Event) {
    event.preventDefault();
    const question = this.userInput.trim();
    if (!question) return;

    this.addUserMessage(question);
    this.userInput = '';
    this.isLoading = true;

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

  private extractResponse(response: any): string {
    // Si la réponse est déjà une string
    if (typeof response === 'string') return response;

    // Si c'est un objet, essayez différentes propriétés possibles
    const possibleProperties = ['response', 'reponse', 'message', 'answer', 'text', 'content'];

    for (const prop of possibleProperties) {
      if (response[prop]) {
        return response[prop];
      }
    }

    // Si c'est un tableau (peut-être la réponse directe de Gemini)
    if (Array.isArray(response)) {
      return response.join('\n');
    }

    // Si aucune propriété connue n'est trouvée, convertissez en JSON
    try {
      return JSON.stringify(response, null, 2);
    } catch {
      return "Réponse non reconnue du serveur";
    }
  }
}
