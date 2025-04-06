import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { KeycloakService } from '../keycloak.service';
import { UserServiceService } from '../UserService/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private keycloak: KeycloakService,
    private router: Router,
    @Inject(UserServiceService) private userService: UserServiceService
  ) {}

  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.keycloak.isLoggedIn();
  
    if (!isLoggedIn) {
      console.log('🔴 User not logged in. Redirecting to Keycloak login...');
      await this.keycloak.login({
        redirectUri: window.location.origin + '/login' // stay on login
      });
      return;
    }
  
    const tokenParsed: any = this.keycloak.getKeycloakInstance().tokenParsed;
    const roles: string[] = tokenParsed?.realm_access?.roles || [];
  
    console.log('🎯 User Roles:', roles);
  
    if (roles.includes('admin') || roles.includes('chef_projet')) {
      this.router.navigate(['/admins']);
    } else if (roles.includes('user')) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }
  async logout() {
    await this.keycloak.logout();
    this.router.navigate(['/login']);
  }}  