import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-blog',
  imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, CommonModule,ReactiveFormsModule,MatFormFieldModule],
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogForm!: FormGroup;
  blogId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogId = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID depuis l'URL

    this.blogForm = this.fb.group({
      title: [''],
      content: [''],
      photo: ['']
    });

    // Charger les données du blog
    this.blogService.getBlogById(this.blogId).subscribe(blog => {
      this.blogForm.patchValue(blog); // Pré-remplit le formulaire avec les données existantes
    });
  }

  onSubmit() {
    console.log("Données envoyées :", this.blogForm.value);

    this.blogService.updateBlog(this.blogForm.value).subscribe(
      (response) => {
        console.log('Blog mis à jour avec succès', response);
        this.router.navigate(['/blogs']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour', error);
      }
    );
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.blogForm.patchValue({ photo: file });
  }
}
