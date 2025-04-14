import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent1 } from './front/pages/Negociation/CH/components/chat/chat.component';

const routes: Routes = [
  {path: 'chat/:userId', component: ChatComponent1}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
