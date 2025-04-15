// voice-recorder.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VoiceRecorderService {
  private recognition: any;
  private isStopped = false;

  constructor() {
    this.initRecognition();
  }

  private initRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition ||
                           (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'fr-FR';
    this.recognition.interimResults = false;
    this.recognition.continuous = false;

    this.recognition.onerror = (event: any) => {
      console.error('Erreur de reconnaissance:', event.error);
      this.isStopped = true;
    };
  }

  startRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.isStopped = false;

      this.recognition.onresult = (event: any) => {
        if (this.isStopped) return;
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      this.recognition.start();
      console.log('Début de l\'enregistrement...');

      // Timeout après 30 secondes
      setTimeout(() => {
        if (!this.isStopped) {
          this.recognition.stop();
          reject('Timeout: Aucune parole détectée');
        }
      }, 30000);
    });
  }

  stopRecording() {
    this.isStopped = true;
    this.recognition.stop();
    console.log('Enregistrement arrêté');
  }
}
