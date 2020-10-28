import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';

import {EditUserInfoComponent} from './components/edit-user-info/edit-user-info.component';
import { EditUserInfoRoutingModule } from './edit-user-info-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const mat = [
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    EditUserInfoComponent
  ],
  imports: [
    CommonModule,
    EditUserInfoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ...mat
  ],
  providers: [
    DatePipe
  ]
})
export class EditUserInfoModule { }
