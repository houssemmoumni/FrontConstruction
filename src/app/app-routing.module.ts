import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './front/pages/Negociation/CH/app/components/chat/chat.component'; // Corrected path

const routes: Routes = [
  { path: 'chat/:userId', component: ChatComponent },
  // ...existing routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes }; // Export routes
