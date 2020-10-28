import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AllUserDialoguesComponent} from './components/all-user-dialogues/all-user-dialogues.component';

const routes: Routes = [
  {
    path: '',
    component: AllUserDialoguesComponent,
    children: [
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
export class DialoguesRoutingModule { }
