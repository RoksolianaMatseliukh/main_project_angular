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

import { AllSentRequestsComponent } from './components/all-sent-requests/all-sent-requests.component';
import { SentRequestsRoutingModule } from './sent-requests-routing.module';
import {SentRequestsService} from './services';
import { SingleSentRequestComponent } from './components/single-sent-request/single-sent-request.component';

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
    AllSentRequestsComponent,
    SingleSentRequestComponent
  ],
  imports: [
    CommonModule,
    SentRequestsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...mat
  ],
  providers: [
    SentRequestsService
  ]
})
export class SentRequestsModule { }
