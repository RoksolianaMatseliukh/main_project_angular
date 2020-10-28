import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AllMessagesComponent} from './components/all-messages/all-messages.component';

const routes: Routes = [
  {
    path: '',
    component: AllMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
