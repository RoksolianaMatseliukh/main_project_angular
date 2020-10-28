import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserPageComponent} from './components/user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    children: [
      {
        path: 'edit',
        loadChildren: () => import('../edit-user-info/edit-user-info.module').then(m => m.EditUserInfoModule)
      },
      {
        path: 'other_users',
        loadChildren: () => import('../other-users/other-users.module').then(m => m.OtherUsersModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('../posts/posts.module').then(m => m.PostsModule)
      },
      {
        path: 'received_requests',
        loadChildren: () => import('../received-requests/received-requests.module').then(m => m.ReceivedRequestsModule)
      },
      {
        path: 'friends',
        loadChildren: () => import('../friends/friends.module').then(m => m.FriendsModule)
      },
      {
        path: 'sent_requests',
        loadChildren: () => import('../sent-requests/sent-requests.module').then(m => m.SentRequestsModule)
      },
      {
        path: 'send_message_to/:id',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesModule)
      },
      {
        path: 'dialogues',
        loadChildren: () => import('../dialogues/dialogues.module').then(m => m.DialoguesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }
