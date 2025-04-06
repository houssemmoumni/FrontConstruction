import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { Error403Component } from './front/pages/error403/error403.component';
import { AuthGuard } from './guard/auth.guard';

// Import components (same as before - truncated here for brevity)
import { EcommerceComponent } from './dashboard/ecommerce/ecommerce.component';
import { CrmComponent } from './dashboard/crm/crm.component';
import { ProjectManagementComponent } from './dashboard/project-management/project-management.component';
import { LmsComponent } from './dashboard/lms/lms.component';
import { HelpDeskComponent } from './dashboard/help-desk/help-desk.component';
import { IndexComponent } from './front/index/index.component';
import { HomeFactoryComponent } from './front/home-factory/home-factory.component';
import { HomeSteelPlantComponent } from './front/home-steel-plant/home-steel-plant.component';
import { HomeFoodIndustryComponent } from './front/home-food-industry/home-food-industry.component';
import { LoginComponent } from './login/login.component';
import { HomeConstructComponent } from './front/home-construct/home-construct.component';
import { ProfileComponent } from './front/profile/profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfileInformationComponent } from './my-profile/profile-information/profile-information.component';
import { UpdateUserComponent } from './dashboard/update-user/update-user.component';

export const routes: Routes = [
  // Default route - redirects to front
  { path: '', redirectTo: 'login', pathMatch: 'full' }
,
  // Admin Routes
  {
    path: 'admins',
    canActivateChild: [AuthGuard],
    data: { roles: ['admin', 'chef_projet'] },
    children: [
      { path: '', component: EcommerceComponent },
      { path: 'profile', component: ProfileInformationComponent },
      { path: 'crm', component: CrmComponent },
      { path: 'project-management', component: ProjectManagementComponent },
      { path: 'lms', component: LmsComponent },
      { path: 'help-desk', component: HelpDeskComponent },
      { path: 'update-user/:email', component: UpdateUserComponent }
    ]
  },

  // User Routes
  {
    path: 'user',
    canActivateChild: [AuthGuard],
    data: { roles: ['user'] },
    children: [
      { path: '', component: HomeConstructComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'home-factory', component: HomeFactoryComponent },
      { path: 'home-steel-plant', component: HomeSteelPlantComponent },
      { path: 'home-food-industry', component: HomeFoodIndustryComponent }
    ]
  },
  

  // Public Front Route
  { path: 'login', component: LoginComponent },

  // Unauthorized
  { path: 'unauthorized', component: Error403Component },

  // Catch-all route
  { path: '**', component: NotFoundComponent }
];