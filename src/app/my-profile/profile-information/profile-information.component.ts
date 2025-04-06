import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { KeycloakService } from '../../keycloak.service';
import { UserServiceService } from '../../UserService/user-service.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-profile-information',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatMenuModule, MatTableModule],
    templateUrl: './profile-information.component.html',
    styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {
    userProfile: any = {};
    role: string = 'user';
    realm: string = 'Unknown';
    formattedCreationDate: string = 'N/A';
    lastLogin: string = 'N/A';
    username: string = '';
    loginHistory: any[] = [];

    constructor(
        private keycloakService: KeycloakService,
        private userService: UserServiceService,
        private router: Router,
        private route: ActivatedRoute,
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

            this.userService.getUserLoginHistory(this.username).subscribe(
                (logins) => {
                    this.loginHistory = logins
                        .sort((a: { timestamp: string | number | Date; }, b: { timestamp: string | number | Date; }) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                        .slice(0, 3)
                        .map((event: { timestamp: any; ip: any; device: any; location: any; details: any; }) => ({
                            timestamp: event.timestamp,
                            ip: event.ip,
                            device: event.device || 'Unknown Device',
                            location: event.location || 'Unknown Location',
                            details: event.details
                        }));
                },
                (error) => {
                    console.error("Failed to load login history", error);
                }
            );
        } catch (error) {
            console.error("Error loading user profile:", error);
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
      

    updateUser() {
        if (this.userProfile?.email) {
            this.router.navigate(['/user/updateprofile', this.userProfile.email]);
        } else {
            this.toastr.error("User email not found");
        }
    }

    logout() {
        this.keycloakService.logout();
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
    
}
