import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

interface Negociation {
  id: number;
  budgetEstime: number;
  dateCreation: string;
  dateModification: string;
  demande: string;
  exigences: string;
  phase: string;
  status: string;
  adminId: number;
  architecteId: number;
  clientId: number;
  ingenieurCivilId: number;
  
}
@Component({
  selector: 'app-negociation-detaille',
  templateUrl: './Negociation-detaille.component.html',
  styleUrls: ['./Negociation-detaille.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class NegociationDetailleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'clientId', 'adminId', 'budgetEstime', 'exigences', 'statut', 'dateCreation', 'dateFin', 'action'];
  dataSource = new MatTableDataSource<Negociation>();
  errorMessage: string | null = null;
  phaseForm: FormGroup;
  negociation: Negociation | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public themeService: CustomizerSettingsService
  ) {
    this.phaseForm = this.fb.group({
      nomPhase: ['', Validators.required],
      statut: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNegociationDetails(Number(id));
    }
  }

  private loadNegociationDetails(id: number) {
    this.http.get<Negociation>(`http://localhost:8890/gestionnegociation/api/phase1/negociations/light/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      )
      .subscribe({
        next: (data: Negociation) => {
          // Ensure empty fields are displayed as 'N/A'
          data.adminId = data.adminId ?? 'N/A';
          data.architecteId = data.architecteId ?? 'N/A';
          data.clientId = data.clientId ?? 'N/A';
          data.ingenieurCivilId = data.ingenieurCivilId ?? 'N/A';

          this.dataSource.data = [data];
          this.negociation = data;
        },
        error: (error: any) => {
          this.errorMessage = 'Erreur lors du chargement des données';
          console.error(error);
        }
      });
  }

  deleteNegociation(id: number | undefined) {
    if (id) {
      this.http.delete(`http://localhost:8890/gestionnegociation/api/phase1/negociations/${id}`)
        .pipe(
          catchError(this.handleError)
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/negociation-all-list']);
          },
          error: (error) => {
            this.errorMessage = 'Erreur lors de la suppression des données';
            console.error(error);
          }
        });
    }
  }

  onAddPhase() {
    if (this.phaseForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        const phaseData = { ...this.phaseForm.value, negociationId: id };
        this.http.post(`http://localhost:8066/gestionnegociation/api/negociations/${id}/phases`, phaseData)
          .pipe(
            catchError(this.handleError)
          )
          .subscribe({
            next: () => {
              this.loadNegociationDetails(Number(id));
              this.phaseForm.reset();
            },
            error: (error) => {
              this.errorMessage = 'Erreur lors de l\'ajout de la phase';
              console.error(error);
            }
          });
      }
    }
  }

  sendNegociationToBackend() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && this.negociation) {
      this.http.post(`http://localhost:8890/gestionnegociation/api/phase1/negociations/${id}`, this.negociation)
        .pipe(
          catchError(this.handleError)
        )
        .subscribe({
          next: () => {
            alert('Négociation ajoutée avec succès.');
            this.router.navigate(['/negociation-all-list']);
          },
          error: (error) => {
            this.errorMessage = 'Erreur lors de l\'ajout de la négociation';
            console.error(error);
          }
        });
    }
  }

  goBack() {
    this.router.navigate(['/negociation-all-list']);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    if (typeof window !== 'undefined' && error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
