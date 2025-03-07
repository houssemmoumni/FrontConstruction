import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-job-application-form',
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class JobApplicationFormComponent implements OnInit {
  @ViewChild('applicationForm') applicationForm!: NgForm;

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
  cvError: string | null = null;

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
    if (file) {
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        this.cvError = null;
      } else {
        this.selectedFile = null;
        this.cvError = '❌ Veuillez télécharger un fichier PDF.';
      }
    }
  }

  onSubmit() {
    if (this.applicationForm.invalid || !this.selectedFile) {
      alert('❌ Veuillez remplir correctement tous les champs et ajouter un CV.');
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

    this.http.post('http://localhost:8060/api/applications', formData).subscribe({
      next: () => {
        alert('✅ Candidature soumise avec succès !');
        this.router.navigate(['/applicationlist']);
      },
      error: (error) => {
        console.error('Erreur lors de la soumission :', error);
        alert(error.error?.error || '❌ Erreur lors de la soumission. Vérifiez les champs et réessayez.');
      },
    });
  }
}
