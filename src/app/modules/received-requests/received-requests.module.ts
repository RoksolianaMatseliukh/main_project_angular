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

import { AllReceivedRequestsComponent } from './components/all-received-requests/all-received-requests.component';
import { ReceivedRequestsRoutingModule } from './received-requests-routing.module';
import {ReceivedRequestsService} from './services';
import { SingleReceivedRequestComponent } from './components/single-received-request/single-received-request.component';

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
    AllReceivedRequestsComponent,
    SingleReceivedRequestComponent
  ],
  imports: [
    CommonModule,
    ReceivedRequestsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...mat
  ],
  providers: [
    ReceivedRequestsService
  ]
})
export class ReceivedRequestsModule { }
