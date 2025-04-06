// admin-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from '../keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private keycloak: KeycloakService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      const isLoggedIn = await this.keycloak.isLoggedIn();
      if (!isLoggedIn) {
        await this.keycloak.login({ redirectUri: window.location.href });
        return false;
      }

      const tokenParsed: any = this.keycloak.getKeycloakInstance().tokenParsed;
      const roles: string[] = tokenParsed?.realm_access?.roles || [];

      if (roles.includes('admin')) {
        return true;
      }

      this.router.navigate(['/unauthorized']);
      return false;

    } catch (error) {
      console.error('Error checking admin role:', error);
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
