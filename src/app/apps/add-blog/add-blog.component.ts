import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BlogService } from '../../services/blog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent {
  blogForm: FormGroup;
  selectedFile: File | null = null;

  // ID de l'utilisateur statique
  userId: number = 1; // Remplace par l'ID de l'utilisateur connecté

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router // Injecter le Router pour la redirection
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formData = new FormData();
      formData.append('title', this.blogForm.value.title);
      formData.append('content', this.blogForm.value.content);
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      // Ajouter l'ID de l'utilisateur dans la requête
      formData.append('userId', this.userId.toString());

      // Appeler le service pour ajouter le blog avec formData
      this.blogService.addBlog(formData).subscribe(
        (response) => {
          console.log('Blog ajouté avec succès:', response);

          // Afficher une alerte SweetAlert2
          Swal.fire({
            title: 'Succès!',
            text: 'Le blog a été ajouté avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              // Rediriger vers la page d'affichage des blogs
              this.router.navigate(['/blog']);
            }
          });

          // Réinitialiser le formulaire
          this.blogForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du blog:', error);

          // Afficher une alerte d'erreur SweetAlert2
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur est survenue lors de l\'ajout du blog.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    }
  }
}
