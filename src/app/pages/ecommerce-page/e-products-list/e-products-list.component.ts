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


@Component({
    selector: 'app-e-products-list',
    imports: [        CommonModule, // Add this import
        MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatTooltipModule],
    templateUrl: './e-products-list.component.html',
    styleUrl: './e-products-list.component.scss'
})
export class EProductsListComponent implements OnInit {
    materials: MaterialResponse[] = [];
    userId: number = 1; // Set a static userId (e.g., 1)

    


    displayedColumns: string[] = ['select',
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
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    constructor(
        public themeService: CustomizerSettingsService,private materialService: MaterialService,
                private router: Router // Inject Router for navigation

    ) {}
    ngOnInit(): void {
        this.loadMaterials();
        console.log(this.materials);
      }
    
      loadMaterials(): void {
        this.materialService.getAllMaterials().subscribe(data => {
          this.dataSource.data = data;
          this.materials = data;
        });
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
            });
        }
      }
          
          
    



