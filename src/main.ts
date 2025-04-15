(window as any).global = window;


import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Importe provideHttpClient
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Utilise provideHttpClient au lieu de HttpClientModule
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
