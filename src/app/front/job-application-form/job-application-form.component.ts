import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-application-form',
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class JobApplicationFormComponent implements OnInit {
  application = {
    candidate: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
    },
    jobOfferId: '' as string | null,
  };
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.application.jobOfferId = this.route.snapshot.paramMap.get('jobId');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('❌ Veuillez télécharger un fichier PDF.');
      this.selectedFile = null;
    }
  }
  onSubmit() {
    if (!this.selectedFile) {
      alert('❌ Veuillez télécharger un CV.');
      return;
    }

    const formData = new FormData();
    formData.append('jobOfferId', this.application.jobOfferId as string);
    formData.append('firstName', this.application.candidate.firstName);
    formData.append('lastName', this.application.candidate.lastName);
    formData.append('email', this.application.candidate.email);
    formData.append('phoneNumber', this.application.candidate.phoneNumber);
    formData.append('address', this.application.candidate.address);
    formData.append('resumeFile', this.selectedFile);

    // Afficher les données du formulaire dans la console
    for (const entry of formData as any) {
      console.log(entry[0], entry[1]);
    }

    this.http.post('http://localhost:8060/api/applications', formData).subscribe({
      next: () => {
        alert('✅ Candidature soumise avec succès !');
        this.router.navigate(['/applicationlist']);
      },
      error: (error) => {
        console.error('Erreur lors de la soumission :', error);
        alert(
          error.error?.error ||
            '❌ Erreur lors de la soumission. Vérifiez les champs et réessayez.'
        );
      },
    });
  }

}
