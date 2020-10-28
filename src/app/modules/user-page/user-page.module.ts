import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';

import {RefreshService} from './services';
import { UserButtonsComponent } from './components/user-buttons/user-buttons.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserPageRoutingModule } from './user-page-routing.module';
import {UserService} from './services';

const mat = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSliderModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatCardModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    UserPageComponent,
    UserButtonsComponent
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...mat
  ],
  providers: [
    UserService,
    RefreshService
  ]
})
export class UserPageModule { }
