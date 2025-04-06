import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.interceptor';
import { KeycloakService } from './app/keycloak.service';
import { initializeKeycloak } from './app/keycloak-init.factory';
import { appConfig } from './app/app.config';
import { UserServiceService } from './app/UserService/user-service.service'; // 👈 import

const keycloakService = new KeycloakService();

initializeKeycloak(keycloakService)()
  .then(() => {
    console.log('✅ Keycloak initialized');

    return bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        provideAnimations(),
        provideToastr(),
        provideHttpClient(withInterceptorsFromDi()), // 👈 necessary for DI-friendly HttpClient
        { provide: KeycloakService, useValue: keycloakService },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ...appConfig.providers || []
      ]
    });
  })
  .then(appRef => {
    const userService = appRef.injector.get(UserServiceService);
    userService.initializeKeycloakInstance(keycloakService.getKeycloakInstance()); // ✅ inject keycloak instance manually
  })
  .catch((err) => {
    console.error('❌ Keycloak failed to initialize', err);
  });
