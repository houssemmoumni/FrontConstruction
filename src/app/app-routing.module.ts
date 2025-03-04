import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmCreateProjectComponent } from './pages/project-management-page/pm-create-project/pm-create-project.component';
import { PmProjectsListComponent } from './pages/project-management-page/pm-projects-list/pm-projects-list.component';
import { PmUpdateAssuranceComponent } from './pages/project-management-page/pm-update-assurance/pm-update-assurance.component';
import { PmCreateContratComponent } from './pages/contrat-page/pm-create-contrat/pm-create-contrat.component';
import { PmContratListComponent } from './pages/contrat-page/pm-contrats-list/pm-contrat-list.component';

const routes: Routes = [
    { path: 'project-management-page/create-assurance', component: PmCreateProjectComponent },
    { path: 'project-management-page/assurances-list', component: PmProjectsListComponent },
    { path: 'project-management-page/update-assurance/:id', component: PmUpdateAssuranceComponent },
    { path: 'contrat-page/create-contrat', component: PmCreateContratComponent },
    { path: 'contrat-page/contrats-list', component: PmContratListComponent },
    { path: '', redirectTo: '/project-management-page/assurances-list', pathMatch: 'full' },
    { path: '**', redirectTo: '/project-management-page/assurances-list' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
