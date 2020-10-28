import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';

import {SingleOtherUserComponent} from './components/single-other-user/single-other-user.component';
import {OtherUsersComponent} from './components/other-users/other-users.component';
import { OtherUsersRoutingModule } from './other-users-routing.module';

const mat = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSliderModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    OtherUsersComponent,
    SingleOtherUserComponent
  ],
  imports: [
    CommonModule,
    OtherUsersRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...mat
  ]
})
export class OtherUsersModule { }
