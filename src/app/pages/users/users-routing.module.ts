import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../../common/sidebar/sidebar.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MenuComponent } from '../../common/menu/menu.component';

const routes: Routes = [
  {
    path: "",
    component: MenuComponent,
    children : [
      {
        path: "",
        redirectTo: "team",
        pathMatch: "full",
      },
      {
        path: "listusers",
        component: UsersListComponent, //besoin
      },
      {
        path: "team",
        component: TeamMembersComponent,
      },
      {
        path: "create-user",
        component: AddUserComponent, 
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
