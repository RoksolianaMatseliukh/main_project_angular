import { CommonModule } from '@angular/common';
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

import { AllUserDialoguesComponent } from './components/all-user-dialogues/all-user-dialogues.component';
import { DialoguesRoutingModule } from './dialogues-routing.module';
import { MessagePipe } from './pipes';
import { SingleUserDialogueComponent } from './components/single-user-dialogue/single-user-dialogue.component';

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
    AllUserDialoguesComponent,
    SingleUserDialogueComponent,
    MessagePipe
  ],
  imports: [
    CommonModule,
    DialoguesRoutingModule,
    ...mat
  ]
})
export class DialoguesModule { }
