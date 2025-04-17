// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getCurrentUserId(): number {
    // Implement your actual authentication logic
    return 1; // Replace with real user ID from your auth system
  }
}
