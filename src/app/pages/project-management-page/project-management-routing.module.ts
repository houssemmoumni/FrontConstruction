import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementPageComponent } from './project-management-page.component';
import { PmProjectsListComponent } from './pm-projects-list/pm-projects-list.component';
import { PmCreateProjectComponent } from './pm-create-project/pm-create-project.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectManagementPageComponent,
        children: [
            { path: '', redirectTo: 'projects-list', pathMatch: 'full' },
            { path: 'projects-list', component: PmProjectsListComponent },
            { path: 'create-project', component: PmCreateProjectComponent },
            { path: 'edit-project/:projet_id', component: PmCreateProjectComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
