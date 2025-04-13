import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Modules/UserModule/ApiResponse';
import { User, UserWrapper } from '../Modules/UserModule/User';
import { KeycloakUser, keyCredential } from '../Modules/UserModule/KeycloakUserRep';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url: string = "http://localhost:8222/api/service/user";
  currentUser: any = {};
  private keycloak!: KeycloakInstance; // now `!` to delay assignment

  constructor(private http: HttpClient, private router: Router) {}

  /** 🔑 Called after Keycloak is initialized */
  initializeKeycloakInstance(instance: KeycloakInstance) {
    this.keycloak = instance;

    this.keycloak.onTokenExpired = () => {
      console.warn('Token expired');
      this.updateTokenOnFailure();
    };
  }

  private async updateTokenOnFailure() {
    try {
      const refreshed = await this.keycloak.updateToken(5);
      if (refreshed) {
        console.log('🔁 Token refreshed');
      }
    } catch (error) {
      console.error('❌ Failed to refresh token:', error);
    }
  }

  getPredefinedRole(): string {
    const tokenParsed: any = (this.keycloak as any)?.tokenParsed;
  
    if (!tokenParsed) {
      throw new Error('Keycloak token is not loaded.');
    }
  
    const roles = tokenParsed?.realm_access?.roles || [];
  
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('chef_projet')) return 'chef_projet';
    if (roles.includes('architecte')) return 'architecte';
    if (roles.includes('ingenieur')) return 'ingenieur';
    if (roles.includes('ouvrier')) return 'ouvrier';
    if (roles.includes('user')) return 'user';

    return 'GUEST';
  }
  
  // Rest of your methods (unchanged)...
  getUserLoginHistory(username: string): Observable<any> {
    return this.http.get<any>(`${this.url}/GetUserLoginHistory/${username}`);
  }

  createUser(): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.url}/registerAllFromKeycloak`, {});
  }

  getAllUsersFromKeycloak(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/GetAllUsersFromKeycloak`);
  }

  adduser(u: User, password: string, role: string, fn: string, ln: string) {
    const creds = new keyCredential('password', password, true);
    const selectedRole = role.includes('admin') ? 'admin' : 'user';
    const keyUser: KeycloakUser = new KeycloakUser(u.login, true, u.email, [creds], [selectedRole], fn, ln);
    const userWrapper: UserWrapper = new UserWrapper(keyUser, u);
    return this.http.post<ApiResponse<User>>(this.url + '/CreateUser', userWrapper);
  }

  async getCurrentUser(): Promise<any> {
    if (this.keycloak?.authenticated) {
      try {
        const userInfo = await this.keycloak.loadUserInfo();
        this.currentUser = userInfo;
        this.currentUser.role = this.getPredefinedRole();
        return this.currentUser;
        console.log('👤 Current user from Keycloak:', userInfo);

      } catch (err) {
        throw err;
      }
    } else {
      return Promise.reject('User is not authenticated');
    }
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/GetAllUsers');
  }

  getUserByEmail(email: string): Observable<UserWrapper> {
    return this.http.get<UserWrapper>(`${this.url}/GetUserByEmail/${email}`);
  }

  getUserByLogin(username: string): Observable<ApiResponse<UserWrapper>> {
    return this.http.get<ApiResponse<UserWrapper>>(`${this.url}/GetUserByUserName/${username}`);
  }

  updateUser(u: User, fn: string, ln: string, lastName: string) {
    const predefinedRole = this.getPredefinedRole();
    const keyUser: KeycloakUser = new KeycloakUser(u.login, true, u.email, [], [predefinedRole], fn, ln);
    const userWrapper: UserWrapper = new UserWrapper(keyUser, u);
    return this.http.put<ApiResponse<User>>(this.url + '/UpdateUser', userWrapper);
  }

  deleteUser(username: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.url}/DeleteUser/${username}`);
  }

  registerUserFromKeycloak(email: string): Promise<UserWrapper | null> {
    return this.getUserByEmail(email).toPromise()
      .then(response => response?.user ? response : null)
      .catch(() => null);
  }
}
