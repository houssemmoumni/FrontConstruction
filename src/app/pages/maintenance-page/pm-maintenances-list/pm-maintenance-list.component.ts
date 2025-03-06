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
import { MaintenanceService } from '../../../../services/maintenance.service';
import { maintenance } from '../../../../models/maintenance';

@Component({
  selector: 'app-pm-maintenance-list',
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
  templateUrl: './pm-maintenance-list.component.html',
  styleUrls: ['./pm-maintenance-list.component.scss']
})
export class PmMaintenanceListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'image', 'email', 'contrat', 'status', 'action'];
  dataSource = new MatTableDataSource<maintenance>();
  searchQuery: string = '';  // Search query for filtering

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public themeService: CustomizerSettingsService,
    private maintenanceService: MaintenanceService,
    private router: Router,
    private changeDetector: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMaintenances();  // Load maintenances initially
  }

  ngAfterViewInit() {
    // Initialize paginator after the view is initialized
    this.dataSource.paginator = this.paginator;
  }

  loadMaintenances() {
    this.maintenanceService.getAllMaintenances().subscribe({
      next: maintenances => {
        this.dataSource.data = maintenances;  // Assign maintenances to the data source
        this.dataSource.paginator = this.paginator;  // Ensure paginator is assigned after data is loaded
        this.changeDetector.detectChanges();  // Ensure Angular detects changes
      },
      error: err => {
        console.error('Error loading maintenances:', err);
      }
    });
  }

  // Method for searching/filtering maintenances by condition
  applySearchFilter() {
    this.dataSource.filterPredicate = (data: maintenance, filter: string): boolean => {
      const transformedFilter = filter.trim().toLowerCase();
      return (
        (data.id?.toString().includes(transformedFilter) ?? false) ||
        data.title.toLowerCase().includes(transformedFilter) ||
        data.description.toLowerCase().includes(transformedFilter) ||
        data.email.toLowerCase().includes(transformedFilter) ||
        (data.contrat?.id?.toString().includes(transformedFilter) ?? false) ||
        data.status.toLowerCase().includes(transformedFilter)
      );
    };
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();

    // Reset paginator to the first page
    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.changeDetector.detectChanges();  // Detect changes after filtering
  }

  updateMaintenance(id: number) {
    this.router.navigate(['/maintenance-page/update-maintenance', id]);
  }

  deleteMaintenance(id: number) {
    this.maintenanceService.deleteMaintenance(id).subscribe({
      next: () => {
        this.loadMaintenances();  // Reload maintenances after deletion
      },
      error: err => {
        console.error('Error deleting maintenance:', err);
      }
    });
  }

  // Method to apply filter for each column
  applyColumnFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: maintenance, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      switch (column) {
        case 'id':
          return data.id?.toString().includes(transformedFilter) ?? false;
        case 'title':
          return data.title.toLowerCase().includes(transformedFilter);
        case 'description':
          return data.description.toLowerCase().includes(transformedFilter);
        case 'email':
          return data.email.toLowerCase().includes(transformedFilter);
        case 'contrat':
          return data.contrat?.id?.toString().includes(transformedFilter) ?? false;
        case 'status':
          return data.status.toLowerCase().includes(transformedFilter);
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