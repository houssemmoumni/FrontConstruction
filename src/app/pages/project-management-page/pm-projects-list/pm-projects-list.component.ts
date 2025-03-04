import { NgIf } from '@angular/common';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssuranceService } from '../../../../services/assurance.service';
import { assurance } from '../../../../models/assurance.model';

@Component({
  selector: 'app-pm-projects-list',
  imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    MatTooltipModule,
    MatProgressBarModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './pm-projects-list.component.html',
  styleUrls: ['./pm-projects-list.component.scss']
})
export class PmProjectsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'adresse', 'email', 'telephone', 'fax', 'logo', 'siteWeb', 'action'];
  dataSource = new MatTableDataSource<assurance>();
  searchQuery: string = '';  // Search query for filtering

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public themeService: CustomizerSettingsService,
    private assuranceService: AssuranceService,
    private router: Router,
    private changeDetector: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadAssurances();  // Load assurances initially
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadAssurances() {
    this.assuranceService.getAllAssurances().subscribe({
      next: assurances => {
        this.dataSource.data = assurances;
        this.changeDetector.detectChanges();  // Ensure Angular detects changes after data load
      },
      error: err => {
        console.error('Error loading assurances:', err);
      }
    });
  }

  // Method for searching/filtering assurances by condition
  applySearchFilter() {
    this.dataSource.filterPredicate = (data: assurance, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      return (
        data.id?.toString().includes(transformedFilter) ||
        data.name.toLowerCase().includes(transformedFilter) ||
        data.description.toLowerCase().includes(transformedFilter) ||
        data.adresse.toLowerCase().includes(transformedFilter) ||
        data.email.toLowerCase().includes(transformedFilter) ||
        data.telephone.toLowerCase().includes(transformedFilter) ||
        data.fax.toLowerCase().includes(transformedFilter) ||
        data.logo.toLowerCase().includes(transformedFilter) ||
        data.siteWeb.toLowerCase().includes(transformedFilter)
      );
    };
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();

    // Reset paginator to the first page
    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.changeDetector.detectChanges();  // Detect changes after filtering
  }

  updateAssurance(id: number) {
    this.router.navigate(['/project-management-page/update-assurance', id]);
  }

  deleteAssurance(id: number) {
    this.assuranceService.deleteAssurance(id).subscribe({
      next: () => {
        this.loadAssurances();
      },
      error: err => {
        console.error('Error deleting assurance:', err);
      }
    });
  }

  // Method to apply filter for each column
  applyColumnFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: assurance, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      switch (column) {
        case 'id':
          return data.id?.toString().includes(transformedFilter) ?? false;
        case 'name':
          return data.name.toLowerCase().includes(transformedFilter);
        case 'description':
          return data.description.toLowerCase().includes(transformedFilter);
        case 'adresse':
          return data.adresse.toLowerCase().includes(transformedFilter);
        case 'email':
          return data.email.toLowerCase().includes(transformedFilter);
        case 'telephone':
          return data.telephone.toLowerCase().includes(transformedFilter);
        case 'fax':
          return data.fax.toLowerCase().includes(transformedFilter);
        case 'logo':
          return data.logo.toLowerCase().includes(transformedFilter);
        case 'siteWeb':
          return data.siteWeb.toLowerCase().includes(transformedFilter);
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