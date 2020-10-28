import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {FriendsService} from '../../../../friends/services';
import {Post} from '../../../models';
import {PostService} from '../../../services';
import {RefreshService} from '../../../../user-page/services';

@Component({
  selector: 'app-all-user-posts',
  templateUrl: './all-user-posts.component.html',
  styleUrls: ['./all-user-posts.component.css']
})
export class AllUserPostsComponent implements OnInit, OnDestroy {

  msg = 'loading ...';
  posts: Post[] = [];
  userId = this.router.getCurrentNavigation().extras.state.userId;
  url = this.router.url;
  userUrl = `/user/${this.userId}/posts`;
  userFriendsId: string[] = [];
  pageOwnerId: string;
  isFriend = false;

  refSub: Subscription;

  constructor(private router: Router,
              private refreshService: RefreshService,
              private friendService: FriendsService,
              private postService: PostService) {
    this.getUserPosts();
  }

  ngOnInit(): void {
    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.posts = [];
      this.getUserPosts();
    });

    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.friendService.getAllUserFriends(this.pageOwnerId).subscribe(data => {
      if (!data) {
        return;
      }
      Object.values(data).forEach(friend => this.userFriendsId.push(friend.id));

      if (this.userFriendsId.includes(this.userId)) { this.isFriend = true; }
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getUserPosts(): void {
    this.msg = 'loading ...';
    this.postService.getAllUserPosts(this.userId)
      .subscribe(data => {
        this.msg = null;
        this.posts = [];
        if (!data) {
          return;
        }
        this.msg = null;
        Object.entries(data).forEach(([id, value]) => this.posts.unshift({id, ...value}));
      });
  }

}
