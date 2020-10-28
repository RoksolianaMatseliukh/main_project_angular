import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AllSentRequestsComponent} from './components/all-sent-requests/all-sent-requests.component';

const routes: Routes = [
  {
    path: '',
    component: AllSentRequestsComponent,
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
export class SentRequestsRoutingModule { }
