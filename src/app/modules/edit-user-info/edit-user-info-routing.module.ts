import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EditUserInfoComponent} from './components/edit-user-info/edit-user-info.component';

const routes: Routes = [
  {
    path: '',
    component: EditUserInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserInfoRoutingModule { }
