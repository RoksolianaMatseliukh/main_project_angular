import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AllFriendsComponent} from './components/all-friends/all-friends.component';

const routes: Routes = [
  {
    path: '',
    component: AllFriendsComponent,
    children: [
      {
        path: ':id',
        loadChildren: () => import('../user-page/user-page.module').then(m => m.UserPageModule)
      },
      {
        path: 'send_message_to/:id',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
