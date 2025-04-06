import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { KeycloakService } from '../../keycloak.service';
import { UserServiceService } from '../../UserService/user-service.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,  MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule],

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};
  role: string = 'user'; // Default role
  realm: string = 'Unknown';
  formattedCreationDate: string = 'N/A';
  lastLogin: string = 'N/A';
  username: string = '';
  loginHistory: any[] = []; // Stores login history (IP, Device, Timestamp)

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserServiceService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    try {
      this.userProfile = await this.keycloakService.loadUserProfile();
      this.username = this.userProfile.username;
      await this.loadProfilePicture();

      const keycloakInstance = this.keycloakService.getKeycloakInstance();
      const token = keycloakInstance.tokenParsed;

      if (token) {
        this.role = token.realm_access?.roles.includes('admin') ? 'admin' : 'user';
        this.realm = token.iss ? (new URL(token.iss).pathname.split('/').pop() || 'Unknown') : 'Unknown';
        this.formattedCreationDate = token['created'] ? new Date(token['created'] * 1000).toLocaleString() : 'N/A';
        this.lastLogin = token.auth_time ? new Date(token.auth_time * 1000).toLocaleString() : 'N/A';
      } else {
        this.toastr.error('Invalid token received', 'Error');
      }

      // ✅ Fetch login history from backend
      this.userService.getUserLoginHistory(this.username).subscribe(
        (logins: { timestamp: string; ip: string; device?: string; location?: string; details?: string }[]) => {
          console.log("📌 Raw API Response:", logins);  // ✅ Log API response

          this.loginHistory = logins
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 3)
            .map(event => {
              console.log("📌 Processing Event:", event); // ✅ Log each event

              return {
                timestamp: event.timestamp,
                ip: event.ip,
                device: event.device || ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', // ✅ Check if `device` exists
                location: event.location || 'Unknown Location',
                details: event.details
              };
            });

        },
        (error) => {
          console.error("❌ Failed to load login history", error);
        }
      );
    } catch (error) {
      console.error("🚨 Error loading user profile:", error);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      this.http.post(`http://localhost:9090/api/service/user/uploadProfilePictureAsBlobByEmail/${this.userProfile?.email}`, formData)
        .subscribe({
          next: (res) => console.log('Upload success:', res),
          error: (err) => console.error('Upload failed:', err)
        });
    }
  }
  profilePicUrl: string = '';

  loadProfilePicture() {
    this.http.get(`http://localhost:9090/api/service/user/getProfilePictureBlobByEmail/${this.userProfile?.email}`, {
      responseType: 'text'
    }).subscribe({
      next: (image: string) => {
        this.profilePicUrl = image;
      },
      error: err => {
        console.warn("No image found.");
        this.profilePicUrl = ''; // or default avatar
      }
    });
  }
  
  /**
   * ✅ Navigate to the update profile page
   */
  updateUser() {
    this.router.navigate(['/user/updateprofile', this.userProfile.email]);
  }

  /**
   * ✅ Log out the user
   */
  logout() {
    this.keycloakService.logout();
  }
}
