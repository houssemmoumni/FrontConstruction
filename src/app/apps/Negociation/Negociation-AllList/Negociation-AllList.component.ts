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
import autoTable from 'jspdf-autotable'; // Ensure the autoTable plugin is imported
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
interface PdfColumn {
  header: string;
  dataKey: keyof Negociation; // Garantit que dataKey correspond aux propriétés de Negociation
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
  displayedColumns: string[] = [
    'id', 
    'budgetEstime', // Updated to match the matColumnDef in the template
    'dateCreation', 
    'dateModification', 
    'demande', 
    'exigences', 
    'phase', 
    'status', 
    'adminId', 
    'architecteId', 
    'clientId', 
    'ingenieurCivilId', 
    'action'
  ];
  dataSource = new MatTableDataSource<Negociation>();
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  router: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNegociations();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private loadNegociations() {
    this.http.get<Negociation[]>('http://localhost:8890/gestionnegociation/api/phase1/negociations/light')
      .pipe(
        catchError(this.handleError)
      )
      .subscribe({
        next: (data) => {
          console.log('Data received from backend:', data); // Debugging log
          this.dataSource.data = data;
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors du chargement des données';
          console.error(error);
        }
      });
  }

  deleteNegociation(id: number) {
    this.http.delete(`http://localhost:8890/gestionnegociation/api/phase1/negociations/${id}`)
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
  ValiderNegociation(id: number) {
    this.http.put(`http://localhost:8890/gestionnegociation/api/phase1/negociations/${id}/validation`, {})
      
      .subscribe({
        next: () => {
          this.router.navigate(['/negociation-all-list']);
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
          window.location.reload();
        },
        error: (error) => {
          window.location.reload();
          
        }
      });
  }
  generatePDF() {
    try {
        console.log('Starting PDF generation...');
        const doc = new jsPDF('l', 'pt', 'a4');
        const currentDate = new Date().toLocaleDateString();
        const pageWidth = doc.internal.pageSize.getWidth();

        // En-tête
        doc.setFontSize(18);
        doc.setTextColor(40, 53, 147);
        doc.text('Rapport des Négociations', pageWidth / 2, 50, { align: 'center' });
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré le : ${currentDate}`, pageWidth - 40, 50, { align: 'right' });

        // Configuration des colonnes avec le typage correct
        const columns: PdfColumn[] = [
            { header: 'ID', dataKey: 'id' },
            { header: 'Budget Estimé (€)', dataKey: 'budgetEstime' },
            { header: 'Date Création', dataKey: 'dateCreation' },
            { header: 'Date Modification', dataKey: 'dateModification' },
            { header: 'Demande', dataKey: 'demande' },
            { header: 'Exigences', dataKey: 'exigences' },
            { header: 'Phase', dataKey: 'phase' },
            { header: 'Statut', dataKey: 'status' },
            { header: 'Admin ID', dataKey: 'adminId' },
            { header: 'Architecte ID', dataKey: 'architecteId' },
            { header: 'Client ID', dataKey: 'clientId' },
            { header: 'Ingénieur Civil ID', dataKey: 'ingenieurCivilId' }
        ];

        // Préparation des données avec vérification de type
        const rows = this.dataSource.data.map(negociation => {
            const row: any = {};
            columns.forEach(col => {
                const value = negociation[col.dataKey];
                switch (col.dataKey) {
                    case 'budgetEstime':
                        row[col.dataKey] = this.formatCurrency(value as number);
                        break;
                    case 'dateCreation':
                    case 'dateModification':
                        row[col.dataKey] = this.formatDate(value as string);
                        break;
                    default:
                        row[col.dataKey] = value;
                }
            });
            return row;
        });

        console.log('Prepared rows for PDF:', rows);

        // Génération du tableau
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            startY: 70,
            theme: 'grid',
            styles: {
                fontSize: 9,
                cellPadding: 4,
                overflow: 'linebreak'
            },
            columnStyles: {
                id: { cellWidth: 30 },
                budgetEstime: { cellWidth: 50 },
                dateCreation: { cellWidth: 60 },
                dateModification: { cellWidth: 60 },
                demande: { cellWidth: 80 },
                exigences: { cellWidth: 80 },
                phase: { cellWidth: 40 },
                status: { cellWidth: 40 },
                adminId: { cellWidth: 40 },
                architecteId: { cellWidth: 40 },
                clientId: { cellWidth: 40 },
                ingenieurCivilId: { cellWidth: 50 }
            }
        });

        console.log('PDF table generated successfully.');

        // Save the PDF
        const fileName = `negociations_${currentDate.replace(/\//g, '-')}.pdf`;
        doc.save(fileName);
        console.log(`PDF saved as ${fileName}`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('An error occurred while generating the PDF. Please try again.');
    }
}
  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  private formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? '-' 
      : date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
  }
  private handleError(error: any) {
    console.error('Error:', error);
    return throwError('Une erreur est survenue');
  }
}