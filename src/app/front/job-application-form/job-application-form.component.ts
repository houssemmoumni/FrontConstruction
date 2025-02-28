import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Ajoutez ceci

@Component({
  selector: 'app-job-application-form',
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.css'],
  standalone: true,
  imports: [FormsModule]  // Import direct de FormsModule
})
export class JobApplicationFormComponent implements OnInit {
  application = {
    fullName: '',
    email: '',
    resume: '',
    jobId: '' as string | null
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.application.jobId = this.route.snapshot.paramMap.get('jobId');
  }

  onSubmit() {
    this.http.post('http://localhost:8060/api/applications', this.application)
      .subscribe({
        next: () => {
          alert('Candidature soumise avec succès !');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de la soumission :', error);
          alert('Erreur lors de la soumission. Veuillez réessayer.');
        }
      });
  }

  uploadFile() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.application.resume = file.name;
      // Vous pouvez également utiliser FormData pour envoyer le fichier au backend
    }
  }
  

}
