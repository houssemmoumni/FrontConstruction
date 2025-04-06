// keycloak-init.factory.ts
import { KeycloakService } from './keycloak.service';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'constructionRealm',
        clientId: 'frontapp',
      },
      initOptions: {
        onLoad: 'login-required', // 🔥 this forces the login screen
        checkLoginIframe: false,
      },
      bearerExcludedUrls: ['/assets'],
    });
}
