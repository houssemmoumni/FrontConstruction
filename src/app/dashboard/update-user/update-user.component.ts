import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ToastrService } from "ngx-toastr";
import { User, UserWrapper } from '../../Modules/UserModule/User';
import { UserServiceService } from '../../UserService/user-service.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UpdateUserComponent implements OnInit {
  message = "";
  Id_user = 0;
  private email: string | null = null;
  private UserWrapper: UserWrapper = {} as UserWrapper;
  userForm: FormGroup;
  showRoleEntrepriseFields = false;
  showEtudiantFields = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private UserService: UserServiceService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({}); // Initialized here for safety
  }

  ngOnInit(): void {
    // Initialize the form structure
    this.userForm = this.fb.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      role: ['', Validators.required],
      role_entreprise: [''],
      identifiant: [''],
      classe: [''],
      specialite: ['']
    });

    // Get email from route params
    this.email = this.activeRoute.snapshot.params['email'];
    if (this.email) {
      this.UserService.getUserByEmail(this.email).subscribe(response => {
        console.log("✅ API Response:", response);

        if (response?.success && response?.data?.user) {
          this.UserWrapper = response.data;
          this.Id_user = this.UserWrapper.user.id_User;

          // Populate the form with existing user data
          this.userForm.patchValue({
            login: this.UserWrapper.user.login ?? '',
            email: this.UserWrapper.user.email ?? '',
            firstName: this.UserWrapper.user.firstName ?? '',
            lastName: this.UserWrapper.user.lastName ?? '',
            role: this.UserWrapper.user.role ?? '',
            identifiant: this.UserWrapper.user.identifiant ?? '',
            classe: this.UserWrapper.user.classe ?? '',
            specialite: this.UserWrapper.user.specialite ?? ''
          });

          console.log("✅ Form populated with user data:", this.userForm.value);
        } else {
          console.error("❌ User data not found in response!");
          this.toastr.error("User not found.", "Error");
        }
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const u: User = this.userForm.value;
      u.id_User = this.Id_user;

      console.log("📤 Sending Update Request:", u);

      this.UserService.updateUser(u, u.firstName, u.lastName, u.lastName).subscribe(
        response => {
          console.log("✅ Update Response:", response);
          if (response?.success) {
            this.toastr.success("User updated successfully!", "Success");
            this.router.navigate(['/admins']);
          } else {
            this.toastr.error("Failed to update user!", "Error");
          }
        },
        error => {
          console.error("❌ Update Failed:", error);
          this.toastr.error("An error occurred while updating the user.", "Error");
        }
      );
    } else {
      this.toastr.warning("Please fill in all required fields.", "Warning");
    }
  }

  toggleFields(role: string): void {
    this.showRoleEntrepriseFields = role === 'Agententreprise';
    this.showEtudiantFields = role === 'etudiant';
  }
}
