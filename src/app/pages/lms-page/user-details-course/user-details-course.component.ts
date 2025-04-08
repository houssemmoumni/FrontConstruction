import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service'; // Importez votre service
import { Course } from '../../../models/course.model'; // Importez votre modèle de cours
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CourseInstructorComponent } from '../l-course-details/course-instructor/course-instructor.component';
import { EnrolledStudentsComponent } from '../l-course-details/enrolled-students/enrolled-students.component';
import { CourseContentComponent } from '../l-course-details/course-content/course-content.component';
import { CourseSalesComponent } from '../l-course-details/course-sales/course-sales.component';
import { CourseVideosComponent } from '../l-course-details/course-videos/course-videos.component';
import { CourseRatingsComponent } from '../l-course-details/course-ratings/course-ratings.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTabNavPanel } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Pour afficher des messages
import { CertificateService } from '../../../services/certificate.service'; // Importez le service de certificat
import { SmsService } from '../../../services/sms.service';


@Component({
  selector: 'app-user-details-course',
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    MatTableModule,
    MatTooltipModule,
    CourseInstructorComponent,
    EnrolledStudentsComponent,
    CourseContentComponent,
    CourseSalesComponent,
    CourseVideosComponent,
    CourseRatingsComponent,
  ],
  templateUrl: './user-details-course.component.html',
  styleUrl: './user-details-course.component.scss',
})
export class UserDetailsCourseComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'courseName',
    'category',
    'instructor',
    'enrolledStudents',
    'startDate',
    'endDate',
    'price',
    'action',
  ];
  dataSource = new MatTableDataSource<Course>(); // Utilisez le modèle de cours

  courseId!: number;
  course!: Course; // Stockez les détails du cours ici
  snackBar: any;
  courses: any;
  private userId = 1; // Remplacez par l'ID de l'utilisateur connecté
  private userCourseId!: number; // ID de l'inscription (UserCourse)

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService, // Injectez votre service
    private certificateService: CertificateService, // Injectez le service de certificat
    private snackBarService: MatSnackBar, // Pour afficher des messages
    public themeService: CustomizerSettingsService ,
    private smsService: SmsService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du cours depuis l'URL
    this.courseId = +this.route.snapshot.params['id'];

    // Charger les détails du cours
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.course = course; // Stocker les détails du cours
        this.dataSource.data = [course]; // Mettre à jour la source de données de la table
      },
      error: (err) => {
        console.error('Failed to fetch course details:', err);
      },
    });
  }


  completeCourse(): void {
    this.courseService.completeCourse(this.userId, this.courseId).subscribe({
      next: (response) => {
        console.log('Cours marqué comme terminé :', response);
        this.userCourseId = response.id;

        // Envoyer un SMS après la complétion du cours
        const toPhoneNumber = '54828257'; // Remplacez par le numéro de téléphone de l'utilisateur
        const message = 'Félicitations, votre certificat est prêt !';
        this.smsService.sendSms(toPhoneNumber, message).subscribe({
          next: () => {
            this.snackBarService.open('SMS envoyé avec succès !', 'Fermer', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error('Erreur lors de l\'envoi du SMS :', err);
            this.snackBarService.open('Félicitations, vous avez terminé le cours ! et SMS envoyé avec succès !', 'Fermer', {
              duration: 3000,
            });
          },
        });

        this.snackBarService.open('Félicitations, vous avez terminé le cours !', 'Fermer', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du cours :', err);
        let errorMessage = 'Une erreur est survenue.';
        if (err.status === 404) {
          errorMessage = 'Inscription au cours non trouvée.';
        } else if (err.status === 500) {
          errorMessage = 'Erreur interne du serveur. Veuillez réessayer plus tard.';
        }
        this.snackBarService.open(errorMessage, 'Fermer', {
          duration: 3000,
        });
      },
    });
  }
// Méthode pour télécharger le certificat
downloadCertificate(): void {
    if (!this.userCourseId) {
      this.snackBarService.open('Veuillez d\'abord terminer le cours.', 'Fermer', {
        duration: 3000,
      });
      return;
    }

    this.certificateService.generateCertificate(this.userCourseId).subscribe({
      next: (response) => {
        // Créer un lien pour télécharger le fichier
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Ouvrir le PDF dans un nouvel onglet
        window.open(url, '_blank');

        // Télécharger le PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificat.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du certificat :', err);
        this.snackBarService.open('Une erreur est survenue.', 'Fermer', {
          duration: 3000,
        });
      },
    });
  }
  // Méthode pour supprimer un cours
  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.snackBarService.open('Course deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          // Recharger les données ou mettre à jour la table
          this.courses = this.courses.filter((course: { id: number }) => course.id !== courseId); // Mettre à jour la liste des cours
          this.dataSource.data = this.courses; // Mettre à jour la source de données de la table
        },
        error: (err: any) => {
          console.error('Failed to delete course:', err);
          this.snackBarService.open('Failed to delete course. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    }
  }
}
