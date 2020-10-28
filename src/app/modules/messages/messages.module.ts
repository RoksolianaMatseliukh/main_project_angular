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

import { AddMessageComponent } from './components/add-message/add-message.component';
import { AllMessagesComponent } from './components/all-messages/all-messages.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {MessagesService} from './services';
import { SingleMessageComponent } from './components/single-message/single-message.component';

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
    AddMessageComponent,
    AllMessagesComponent,
    SingleMessageComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...mat
  ],
  providers: [
    MessagesService
  ]
})
export class MessagesModule { }
