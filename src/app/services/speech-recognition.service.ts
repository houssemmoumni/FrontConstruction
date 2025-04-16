// src/app/services/speech-recognition.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;
  private speechSubject = new Subject<string>();
  private _isListening = false;

  public readonly speech$: Observable<string> = this.speechSubject.asObservable();
  public get isListening(): boolean { return this._isListening; }

  constructor(private ngZone: NgZone) {
    this.initSpeechRecognition();
  }

  private initSpeechRecognition(): void {
    const SpeechRecognition = (window as any).SpeechRecognition ||
                            (window as any).webkitSpeechRecognition;

    if (typeof SpeechRecognition !== 'undefined') {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'fr-FR';

      this.recognition.onresult = (event: any) => {
        this.ngZone.run(() => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          this.speechSubject.next(transcript);
        });
      };

      this.recognition.onerror = (event: any) => {
        this.ngZone.run(() => {
          this._isListening = false;
          this.speechSubject.error(event.error);
        });
      };
    }
  }

  public isSupported(): boolean {
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public startListening(): void {
    if (this.recognition && !this._isListening) {
      this._isListening = true;
      this.recognition.start();
    }
  }

  public stopListening(): void {
    if (this.recognition && this._isListening) {
      this._isListening = false;
      this.recognition.stop();
    }
  }
}
