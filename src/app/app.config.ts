import {
    ApplicationConfig,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    BrowserAnimationsModule,
    provideAnimations,
} from '@angular/platform-browser/animations';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(),
        provideAnimations(),
        //provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        importProvidersFrom(
            BrowserAnimationsModule,
            RouterModule.forRoot(routes, {
                scrollPositionRestoration: 'top',
            })
        ),
    ],
};
