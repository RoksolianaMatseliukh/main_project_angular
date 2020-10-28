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

import { AllFriendsComponent } from './components/all-friends/all-friends.component';
import { FriendsRoutingModule } from './friends-routing.module';
import {FriendsService} from './services';
import { SingleFriendComponent } from './components/single-friend/single-friend.component';

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
    AllFriendsComponent,
    SingleFriendComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...mat
  ],
  providers: [
    FriendsService
  ]
})
export class FriendsModule { }
