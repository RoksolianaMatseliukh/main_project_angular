import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AllUsersComponent } from './components/all-users/all-users.component';
import { AllUsersRoutingModule } from './all-users-routing.module';
import { SingleUserComponent } from './components/single-user/single-user.component';

@NgModule({
  declarations: [
    AllUsersComponent,
    SingleUserComponent,
  ],
  exports: [
    AllUsersComponent
  ],
  imports: [
    CommonModule,
    AllUsersRoutingModule
  ]
})
export class AllUsersModule { }
