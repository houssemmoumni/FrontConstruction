import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { KeycloakService } from '../keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private userRoles: string[] = [];

  constructor(private router: Router, private keycloak: KeycloakService) {
    console.log("✅ AuthGuard Initialized");
  }

  async checkAccess(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    console.log("🔍 Checking access...");

    const isLoggedIn = await this.keycloak.isLoggedIn();
    console.log("🔐 Authenticated:", isLoggedIn);

    if (!isLoggedIn) {
      await this.keycloak.login({ redirectUri: window.location.origin + state.url });
      return false;
    }

    const tokenParsed: any = this.keycloak.getKeycloakInstance().tokenParsed;
    this.userRoles = tokenParsed?.realm_access?.roles || [];
    console.log("✅ User Roles:", this.userRoles);

    const requiredRoles = route.data['roles'] as string[] | undefined;

    // ✅ Redirect on base route with no requiredRoles
    if (!requiredRoles || requiredRoles.length === 0) {
      // If landing directly on root (''), redirect based on role
      if (route.routeConfig?.path === '') {
        if (this.userRoles.includes('admin') || this.userRoles.includes('chef_projet')) {
          console.log("➡ Redirecting to /admins");
          return this.router.parseUrl('/admins');
        } else if (this.userRoles.includes('user')) {
          console.log("➡ Redirecting to /user");
          return this.router.parseUrl('/user');
        } else {
          console.warn("⚠ No valid role. Redirecting to /unauthorized");
          return this.router.parseUrl('/unauthorized');
        }
      }

      console.log("✅ No roles required. Access granted.");
      return true;
    }

    const hasRequiredRole = requiredRoles.some(role => this.userRoles.includes(role));
    if (hasRequiredRole) {
      console.log("✅ Has required role. Access granted.");
      return true;
    }

    console.error("❌ Access denied. Redirecting to /unauthorized");
    return this.router.createUrlTree(['/unauthorized']);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAccess(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAccess(route, state);
  }
}
