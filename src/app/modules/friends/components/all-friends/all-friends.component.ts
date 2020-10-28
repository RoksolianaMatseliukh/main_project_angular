import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {FriendsService} from '../../services';
import {RefreshService} from '../../../user-page/services';
import {User} from '../../../user-page/models';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.css']
})
export class AllFriendsComponent implements OnInit, OnDestroy {

  msg = 'loading ...';
  friends: User[] = [];
  userId: string;
  url = this.router.url;
  userUrl: string;
  pageOwnerId: string;

  refSub: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private friendService: FriendsService,
              private refreshService: RefreshService) {
    this.activatedRoute.params.subscribe(() => {
      this.userId = history.state.userId;
      this.userUrl = `/user/${this.userId}/friends`;
    });

    this.getUserFriends();
  }

  ngOnInit(): void {
    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.friends = [];
      this.getUserFriends();
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getUserFriends(): void {
    this.msg = 'loading ...';
    this.friendService.getAllUserFriends(this.userId)
      .subscribe(data => {
        this.msg = null;
        this.friends = [];
        if (!data) {
          return;
        }
        Object.entries(data).forEach(([id, value]) => this.friends.push({friendId: id, ...value}));
      });
  }
}
