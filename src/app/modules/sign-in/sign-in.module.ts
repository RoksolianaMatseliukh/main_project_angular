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

import {AllUsersModule} from '../../../share/modules/all-users/all-users.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';

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
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AllUsersModule,
    ...mat
  ]
})
export class SignInModule { }
