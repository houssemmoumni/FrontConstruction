import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CommonModule } from '@angular/common'; // Add this import
import { MaterialService } from '../../../services/material.service';
import { MaterialResponse } from '../../../models/material-response';
import { MaterialRequest } from '../../../models/material-request';
import { MaterialStatus } from '../../../models/material-status'; // Adjust the path as needed



@Component({
    selector: 'app-e-products-list',
    standalone: true, // Add this line
    imports: [        CommonModule, // Add this import
        MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatTooltipModule],
    templateUrl: './e-products-list.component.html',
    styleUrl: './e-products-list.component.scss'
})
export class EProductsListComponent implements OnInit {
    materials: MaterialResponse[] = [];
    userId: number = 1; // Set a static userId (e.g., 1)





    displayedColumns: string[] = [
  'materialId',
  'material',
  'category',
  'price',
  'availableQuantity',
  'status',
  'action'];
    dataSource = new MatTableDataSource<MaterialResponse>(this.materials);
    selection = new SelectionModel<MaterialResponse>(true, []);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('materialSearch') materialSearch!: Element; // Reference to the search input


    availableCount: number = 0;
    unavailableCount: number = 0;
     // Filter values
     filterValues = {
        materialName: '',
        category: '',
        status: '',
    };

    // Unique categories for the dropdown
    categories: string[] = [];
    MaterialStatus = MaterialStatus;


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: MaterialResponse): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
    }

    // Search Filter
    // applyFilter(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    constructor(
        public themeService: CustomizerSettingsService,private materialService: MaterialService,
                private router: Router // Inject Router for navigation

    ) {        this.dataSource.filterPredicate = this.createFilter();
    }
    ngOnInit(): void {
        this.loadMaterials();
        console.log(this.materials);
      }

      loadMaterials(): void {
        this.materialService.getAllMaterials().subscribe(data => {
          this.materials = data.map(material => {
            if (material.availableQuantity === 0) {
                material.status = MaterialStatus.NON_DISPONIBLE;
            }
            return material;
        });
          this.dataSource.data = data;
          // Dynamically count available and unavailable materials
          this.availableCount = this.materials.filter(mat => mat.status === 'DISPONIBLE').length;
          this.unavailableCount = this.materials.filter(mat => mat.status === 'NON_DISPONIBLE').length;
          this.categories = [...new Set(this.materials.map((mat) => mat.categoryName))];

      });
      }
      getStatusValues(): string[] {
        return Object.values(MaterialStatus);
    }
      // Apply filter when any filter input changes
    applyFilter(event: Event): void {
        const target = event.target as HTMLInputElement | HTMLSelectElement;
        const filterName = target.id || target.name; // Use id or name to identify the filter

        switch (filterName) {
            case 'materialSearch':
                this.filterValues.materialName = target.value.trim().toLowerCase();
                break;
            case 'categoryFilter':
                this.filterValues.category = target.value;
                break;
            case 'statusFilter':
                this.filterValues.status = target.value;
                break;
        }

        // Apply the filter
        this.dataSource.filter = JSON.stringify(this.filterValues);
    }

    // Custom filter predicate
    createFilter(): (data: MaterialResponse, filter: string) => boolean {
        return (data: MaterialResponse, filter: string): boolean => {
            const filterTerms = JSON.parse(filter);

            // Check material name
            const matchesMaterialName = data.name.toLowerCase().includes(filterTerms.materialName);

            // Check category
            const matchesCategory = filterTerms.category ? data.categoryName === filterTerms.category : true;

            // Check status
            const matchesStatus = filterTerms.status ? data.status === filterTerms.status : true;

            // Return true only if all conditions are met
            return matchesMaterialName && matchesCategory && matchesStatus;
        };
    }

       addMaterial(): void
          {
            this.router.navigate(['/ecommerce-page/create-product']);


            }
            updateTask(materialId:number): void {
                console.log('Navigating to edit-product with ID:', materialId);

              this.router.navigate(['/ecommerce-page/edit-product', materialId]);
              };



          deleteMaterial(materialId: number): void {
            this.materialService.deleteMaterial(this.userId, materialId).subscribe(() => {
                this.materials = this.materials.filter(material => material.id !== materialId);
                this.dataSource.data = this.materials; // Update the table data

                this.availableCount = this.materials.filter(mat => mat.status === 'DISPONIBLE').length;
                this.unavailableCount = this.materials.filter(mat => mat.status === 'NON_DISPONIBLE').length;

            });
        }
      }






