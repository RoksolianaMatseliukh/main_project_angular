import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ControlLogInService} from './modules/user-page/services/guards';
import {HomeComponent} from './app-components/home/components/home.component';
import {UnknownPageComponent} from './app-components/unknown-page/unknown-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    component: HomeComponent
  },
  {
    path: 'registration',
    loadChildren: () => import('./modules/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'registration/user/:id',
    pathMatch: 'full',
    redirectTo: 'user/:id'
  },
  {
    path: 'sign_in',
    loadChildren: () => import('./modules/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'sign_in/user/:id',
    pathMatch: 'full',
    redirectTo: 'user/:id'
  },
  {
    path: 'user/:id',
    canActivate: [ControlLogInService],
    loadChildren: () => import('./modules/user-page/user-page.module').then(m => m.UserPageModule)
  },
  {
    path: '**',
    component: UnknownPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
