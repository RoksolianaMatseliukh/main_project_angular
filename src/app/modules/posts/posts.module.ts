import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { AllPostCommentsComponent } from './components/comments/all-post-comments/all-post-comments.component';
import {AllUserPostsComponent} from './components/posts/all-user-posts/all-user-posts.component';
import {CommentService, PostService} from './services';
import {LikeDislikeService} from './services';
import { PostsRoutingModule } from './posts-routing.module';
import { SinglePostCommentComponent } from './components/comments/single-post-comment/single-post-comment.component';
import {SingleUserPostComponent} from './components/posts/single-user-post/single-user-post.component';

const mat = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSliderModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
];

@NgModule({
  declarations: [
    AllUserPostsComponent,
    SingleUserPostComponent,
    AddPostComponent,
    AllPostCommentsComponent,
    SinglePostCommentComponent,
    AddCommentComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...mat
  ],
  providers: [
    PostService,
    CommentService,
    LikeDislikeService
  ]
})
export class PostsModule { }
