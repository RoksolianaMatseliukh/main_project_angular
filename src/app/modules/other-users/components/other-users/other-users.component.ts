import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {FriendsService} from '../../../friends/services';
import {GetAllUsersService} from '../../../../../share/modules/all-users/services';
import {ReceivedRequestsService} from '../../../received-requests/services';
import {RefreshService} from '../../../user-page/services';
import {SentRequestsService} from '../../../sent-requests/services';
import {User} from '../../../user-page/models';

@Component({
  selector: 'app-other-users',
  templateUrl: './other-users.component.html',
  styleUrls: ['./other-users.component.css']
})
export class OtherUsersComponent implements OnInit, OnDestroy {

  msg = 'loading ...';
  otherUsers: Partial<User>[] = [];
  userFriends: Partial<User>[] = [];
  userRequests: Partial<User>[] = [];
  userSentRequests: Partial<User>[] = [];
  userId = this.router.getCurrentNavigation().extras.state.userId;
  url = this.router.url;
  userUrl = `/user/${this.userId}/other_users`;
  pageOwnerId: string;

  refSub: Subscription;

  constructor(private getAllUsersService: GetAllUsersService,
              private router: Router,
              private friendsService: FriendsService,
              private requestService: ReceivedRequestsService,
              private sentRequestService: SentRequestsService,
              private refreshService: RefreshService) {
    this.getOtherUsers();
  }

  ngOnInit(): void {
    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.otherUsers = [];
      this.getOtherUsers();
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getOtherUsers(): void {
    this.msg = 'loading ...';

    this.getAllUsersService.getAllUsers()
      .subscribe(data => {
        if (!data) {
          this.msg = null;
          return;
        }
      
        this.otherUsers = [];
        Object.entries(data).forEach(([id, user]) => {
          const {name, surname} = user;
          this.otherUsers.push({id, name, surname});
        });
        this.otherUsers = this.otherUsers.filter(user => user.id !== this.userId);

        this.userManager(this.friendsService.getAllUserFriends(this.userId), this.userFriends);
        this.userManager(this.requestService.getReceivedUserRequests(this.userId), this.userRequests);
        this.userManager( this.sentRequestService.getSentUserRequests(this.userId), this.userSentRequests);

        setTimeout(() => {
          this.msg = null;
        }, 1000);
      });
  }

  userManager(func, array): void {
    func.subscribe(data => {
      if (!data) {
        return;
      }
      Object.values(data).forEach((user: User) => {
        const {id, name, surname} = user;
        array.push({id, name, surname});
      });

      array = array.map(JSON.stringify);
      this.otherUsers = this.otherUsers.map(otherUser => JSON.stringify(otherUser))
                                       .filter(user => !array.includes(user)).map(user => JSON.parse(user));
    });
  }

}
