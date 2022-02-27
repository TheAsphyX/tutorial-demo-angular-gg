import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { MessageDetailComponent } from './pages/message-detail/message-detail.component';
import { MessagesComponent } from './pages/messages/messages.component';



const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: MessagesComponent
      },
      {
        path: 'message/:id',
        component: MessageDetailComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
