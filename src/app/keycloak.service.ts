// src/app/keycloak.service.ts
import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance, KeycloakInitOptions } from 'keycloak-js';

interface KeycloakInitConfig {
  config: {
    url: string;
    realm: string;
    clientId: string;
  };
  initOptions?: KeycloakInitOptions;
  bearerExcludedUrls?: string[];
}

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak!: KeycloakInstance;

  init(configObj: KeycloakInitConfig): Promise<boolean> {
    this.keycloak = new Keycloak(configObj.config);
  
    // Ensure redirectUri is /login unless explicitly provided
    const defaultInitOptions: KeycloakInitOptions = {
      onLoad: 'login-required',
      checkLoginIframe: true,
      redirectUri: window.location.origin + '/login',
      ...configObj.initOptions // this merges any custom options
    };
  
    return this.keycloak.init(defaultInitOptions).then(auth => {
      return auth;
    });
  }
  // Ajoutez ceci dans votre KeycloakService
public async loadUserProfile(): Promise<Keycloak.KeycloakProfile> {
  return this.keycloak.loadUserProfile();
}

  isAuthenticated(): boolean {
    return this.keycloak?.authenticated ?? false;
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }

  getUsername(): string | undefined {
    return this.keycloak?.tokenParsed?.['preferred_username'];
  }

  logout(): void {
    this.keycloak.logout();
  }
  public async getUserRoles(): Promise<string[]> {
    return this.keycloak?.realmAccess?.roles ?? [];
  }

  getKeycloakInstance(): KeycloakInstance {
    return this.keycloak;
  }
  public async isLoggedIn(): Promise<boolean> {
    return this.keycloak?.authenticated ?? false;
  }

  public login(options?: Keycloak.KeycloakLoginOptions) {
    return this.keycloak.login(options);
  }
}
