import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-application-form',
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class JobApplicationFormComponent implements OnInit {
  application = {
    candidate: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: ''
    },
    candidateId: 10,  // Remplace avec l'ID du candidat connecté (récupéré depuis l'authentification)
    jobOfferId: '' as string | null
  };
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router // Injectez le Router
  ) {}

  ngOnInit() {
    this.application.jobOfferId = this.route.snapshot.paramMap.get('jobId');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert("❌ Veuillez télécharger un CV.");
      return;
    }

    const formData = new FormData();
    formData.append('candidateId', this.application.candidateId.toString());
    formData.append('jobOfferId', this.application.jobOfferId as string);
    formData.append('firstName', this.application.candidate.firstName);
    formData.append('lastName', this.application.candidate.lastName);
    formData.append('email', this.application.candidate.email);
    formData.append('phoneNumber', this.application.candidate.phoneNumber);
    formData.append('address', this.application.candidate.address);
    formData.append('resumeFile', this.selectedFile);

    this.http.post('http://localhost:8060/api/applications', formData).subscribe({
      next: () => {
        alert('Candidature soumise avec succès !');
        this.router.navigate(['/applicationlist']); // Redirigez vers la liste des candidatures
      },
      error: (error) => {
        console.error('Erreur lors de la soumission :', error);
        console.log('Détail de l\'erreur :', error.error);
        alert(error.error.error || 'Erreur lors de la soumission. Vérifiez les champs et réessayez.');
      }
    });
  }
}
