import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RouterLink } from '@angular/router';
import { jsPDF } from 'jspdf'; // Import jsPDF
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Negociation {
  id: number;
  clientId: number;
  adminId: number;
  budgetEstime: number;
  exigences: string;
  statut: string;
  dateCreation: string;
  dateFin: string;
}

@Component({
  selector: 'app-negociation-all-list',
  templateUrl: './Negociation-AllList.component.html',
  styleUrls: ['./Negociation-AllList.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NegociationAllListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'clientId', 'adminId', 'budgetEstime', 'exigences', 'statut', 'dateCreation', 'dateFin', 'action'];
  dataSource = new MatTableDataSource<Negociation>();
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNegociations();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private loadNegociations() {
    this.http.get<Negociation[]>('http://localhost:8066/api/negociations/all')
      .pipe(
        catchError(this.handleError)
      )
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (error) => {
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
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression des données';
          console.error(error);
        }
      });
  }

  generatePDF() {
    const doc = new jsPDF();
    let row = 20; // Commencer un peu plus bas pour laisser de l'espace pour l'en-tête

    // Ajouter un en-tête stylisé
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Liste des Négociations', 105, row, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(10, row + 5, 200, row + 5); // Ligne sous l'en-tête

    // Réinitialiser les styles pour le contenu
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    // Ajouter les en-têtes de colonnes
    row += 15;
    doc.setFont("helvetica", "bold"); // Définir la police en gras
    doc.text('ID', 10, row);
    doc.text('Client ID', 30, row);
    doc.text('Admin ID', 60, row);
    doc.text('Budget Estimé', 90, row);
    doc.text('Exigences', 130, row);
    doc.text('Statut', 170, row);
    doc.text('Date Création', 200, row);
    doc.text('Date Fin', 250, row);
    doc.setFont("helvetica", "normal"); // Réinitialiser la police à normale

    // Ajouter les données
    this.dataSource.data.forEach((negociation, index) => {
        row += 10;
        doc.text(negociation.id.toString(), 10, row);
        doc.text(negociation.clientId.toString(), 30, row);
        doc.text(negociation.adminId.toString(), 60, row);
        doc.text(negociation.budgetEstime.toString(), 90, row);
        doc.text(negociation.exigences, 130, row);
        doc.text(negociation.statut, 170, row);
        doc.text(negociation.dateCreation, 200, row);
        doc.text(negociation.dateFin, 250, row);

        // Vérifier si on atteint la fin de la page
        if (row > 280) {
            doc.addPage();
            row = 20; // Réinitialiser la position de la ligne pour la nouvelle page
        }
    });

    // Sauvegarder le PDF
    doc.save('negociations.pdf');
}

  private handleError(error: any) {
    if (error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.message);
    } else {
      // Server-side error
      console.error('Server-side error:', error);
    }
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