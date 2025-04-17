import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectManagementPageComponent } from './project-management-page.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { PmProjectsListComponent } from './pm-projects-list/pm-projects-list.component';
import { PmCreateProjectComponent } from './pm-create-project/pm-create-project.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagementService } from '../../services/project-management.service';
import { DatePipe } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxEditorModule } from 'ngx-editor';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule,
        ProjectManagementRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        GoogleMapsModule,
        MatIconModule,
        MatCardModule,
        HttpClientModule,
        MatSortModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxEditorModule,
        PmProjectsListComponent,
        ProjectManagementPageComponent,
        PmCreateProjectComponent
    ],
    providers: [
        ProjectManagementService,
        DatePipe
    ]
})
export class ProjectManagementModule { }
