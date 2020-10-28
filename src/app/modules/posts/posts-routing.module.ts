import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AllUserPostsComponent} from './components/posts/all-user-posts/all-user-posts.component';

const routes: Routes = [
  {
    path: '',
    component: AllUserPostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
