import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../services/reclamation.service';
import { ReponseService } from '../../services/reponse.service';
import { Reclamation } from '../../models/reclamation.model';
import { Reponse } from '../../models/reponse.model';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css'],
})

export class ReclamationComponent implements OnInit {
  displayedColumns: string[] = ['idreclamation', 'titre', 'description', 'dateReclamation', 'status', 'actions'];
  dataSource = new MatTableDataSource<Reclamation>();
    reponseService: any;
    dialog: any;

  constructor(
    private reclamationService: ReclamationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(
      (data: Reclamation[]) => {
        this.dataSource.data = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des réclamations', error);
        this.snackBar.open('Erreur lors de la récupération des réclamations', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatusClass(status: string | null | undefined): string {
    if (!status) {
      return 'badge-default';
    }

    switch (status.toLowerCase()) {
      case 'en cours':
        return 'badge-pending';
      case 'résolu':
        return 'badge-resolved';
      case 'fermé':
        return 'badge-closed';
      default:
        return 'badge-default';
    }
  }


  viewReclamation(reclamation: Reclamation): void {
    if (reclamation.idreclamation) {
      this.router.navigate(['/view', reclamation.idreclamation]);
    }
  }

  replyReclamation(reclamation: Reclamation): void {
    if (reclamation.idreclamation !== undefined) {
      this.router.navigate(['/reponse', reclamation.idreclamation]); // Rediriger vers le formulaire de réponse
    } else {
      console.error('ID de réclamation non défini');
      this.snackBar.open('Erreur : ID de réclamation non défini', 'Fermer', {
        duration: 3000,
      });
    }
  }

  deleteReclamation(id: number): void {
    this.reclamationService.deleteReclamation(id).subscribe(
      () => {
        this.snackBar.open('Réclamation supprimée avec succès', 'Fermer', {
          duration: 3000,
        });
        this.loadReclamations();
      },
      (error: any) => {
        console.error('Erreur lors de la suppression de la réclamation', error);
        this.snackBar.open('Erreur lors de la suppression de la réclamation', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }
}
