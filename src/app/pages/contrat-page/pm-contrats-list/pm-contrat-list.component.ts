import { NgIf } from '@angular/common';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContratService } from '../../../../services/contrat.service';
import { contrat } from '../../../../models/contrat.model';

@Component({
  selector: 'app-pm-contrat-list',
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    MatTooltipModule,
    MatProgressBarModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './pm-contrat-list.component.html',
  styleUrls: ['./pm-contrat-list.component.scss']
})
export class PmContratListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'contratCondition', 'dateSignature', 'dateExpiration', 'assurance', 'projet', 'action'];
  dataSource = new MatTableDataSource<contrat>();
  searchQuery: string = '';  // Search query for filtering

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public themeService: CustomizerSettingsService,
    private contratService: ContratService,
    private router: Router,
    private changeDetector: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadContrats();  // Load contracts initially
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'id':
          return item.id;
        case 'contratCondition':
          return item.contratcondition.toLowerCase();
        case 'dateSignature':
          return new Date(item.date_signature);
        case 'dateExpiration':
          return new Date(item.date_expiration);
        case 'assurance':
          return item.assurance?.name.toLowerCase();
        case 'projet':
          return item.projet?.title.toLowerCase();
        default:
          return (item as any)[property];
      }
    };
  }

  loadContrats() {
    this.contratService.getAllContrats().subscribe({
      next: contrats => {
        this.dataSource.data = contrats;  // Assign contracts to the data source
        this.dataSource.paginator = this.paginator;  // Ensure paginator is assigned after data is loaded
        this.dataSource.sort = this.sort;  // Ensure sort is assigned after data is loaded
        this.changeDetector.detectChanges();  // Ensure Angular detects changes
      },
      error: err => {
        console.error('Error loading contrats:', err);
      }
    });
  }

  // Method for searching/filtering contrats by condition
  applySearchFilter() {
    this.dataSource.filterPredicate = (data: contrat, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      return (
        data.id?.toString().includes(transformedFilter) ||
        data.contratcondition.toLowerCase().includes(transformedFilter) ||
        data.date_signature.toLowerCase().includes(transformedFilter) ||
        data.date_expiration.toLowerCase().includes(transformedFilter) ||
        data.assurance?.name.toLowerCase().includes(transformedFilter) ||
        data.projet?.title.toLowerCase().includes(transformedFilter)
      );
    };
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();

    // Reset paginator to the first page
    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.changeDetector.detectChanges();  // Detect changes after filtering
  }

  updateContrat(id: number) {
    this.router.navigate(['/contrat-page/update-contrat', id]);
  }

  deleteContrat(id: number) {
    this.contratService.deleteContrat(id).subscribe({
      next: () => {
        this.loadContrats();  // Reload contrats after deletion
      },
      error: err => {
        console.error('Error deleting contrat:', err);
      }
    });
  }

  // Method to apply filter for each column
  applyColumnFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: contrat, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      switch (column) {
        case 'id':
          return data.id?.toString().includes(transformedFilter);
        case 'contratCondition':
          return data.contratcondition.toLowerCase().includes(transformedFilter);
        case 'dateSignature':
          return data.date_signature.toLowerCase().includes(transformedFilter);
        case 'dateExpiration':
          return data.date_expiration.toLowerCase().includes(transformedFilter);
        case 'assurance':
          return data.assurance?.name.toLowerCase().includes(transformedFilter);
        case 'projet':
          return data.projet?.title.toLowerCase().includes(transformedFilter);
        default:
          return false;
      }
    };

    // Apply the filter to the data source
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reset paginator to the first page
    if (this.paginator) {
      this.paginator.firstPage();
    }

    // Detect changes after filtering
    this.changeDetector.detectChanges();
  }
}