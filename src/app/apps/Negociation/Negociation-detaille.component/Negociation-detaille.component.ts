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

interface NegociationDetail {
  id: number;
  clientId: number;
  clientName: string;
  adminId: number;
  adminName: string;
  budgetEstime: number;
  exigences: string;
  statut: string;
  dateCreation: string;
  dateFin: string;
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
  dataSource = new MatTableDataSource<NegociationDetail>();
  errorMessage: string | null = null;
  phaseForm: FormGroup;

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
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadNegociationDetails(id);
    });
  }

  private loadNegociationDetails(id: number) {
    this.http.get<NegociationDetail>(`http://localhost:8066/api/negociations/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      )
      .subscribe({
        next: (data: NegociationDetail) => {
          this.dataSource.data = [data];
        },
        error: (error: any) => {
          this.errorMessage = 'Erreur lors du chargement des données';
          console.error(error);
        }
      });
  }

  deleteNegociation(id: number) {
    this.http.delete(`http://localhost:8066/api/negociations/${id}`)
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

  onAddPhase() {
    if (this.phaseForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        const phaseData = { ...this.phaseForm.value, negociationId: id };
        this.http.post(`http://localhost:8066/api/negociations/${id}/phases`, phaseData)
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
