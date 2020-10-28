import {Component, Input, OnInit} from '@angular/core';

import {FriendsService} from '../../../friends/services';
import {ReceivedRequestsService} from '../../services';
import {RefreshService} from '../../../user-page/services';
import {SentRequestsService} from '../../../sent-requests/services';
import {User} from '../../../user-page/models';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-single-received-request',
  templateUrl: './single-received-request.component.html',
  styleUrls: ['./single-received-request.component.css']
})
export class SingleReceivedRequestComponent implements OnInit {

  @Input() request: User;
  @Input() userId: string;
  @Input() pageOwnerId: string;
  sentRequestsOfFriend: User[] = [];
  userPhoto: string;
  noAvatar = '/assets/no-avatar.png';

  constructor(private receivedRequestsService: ReceivedRequestsService,
              private sentRequestsService: SentRequestsService,
              private friendsService: FriendsService,
              private userService: UserService,
              private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.userService.getUser(this.request.id).subscribe(data => {
      if (!data.img) {
        this.userPhoto = this.noAvatar;
        return;
      }
      this.userPhoto = data.img;
    });
  }

  removeRequest(): void {
    this.removeRequestManager(true);
  }

  confirmRequest(): void {
    this.receivedRequestsService.removeReceivedRequest(this.userId, this.request.requestId).subscribe(() => {
      this.refreshService.$refresh.next();
    });

    this.removeRequestManager(false);

    this.friendsService.addFriend(this.request, this.userId).subscribe(() => {
      this.refreshService.$refresh.next();
    });

    this.userService.getUser(this.userId).subscribe(data => {
      this.friendsService.addFriend({id: this.userId, ...data}, this.request.id).subscribe(() => {
        this.refreshService.$refresh.next();
      });
    });
  }

  removeRequestManager(trueFalse: boolean): void {
    this.sentRequestsService.getSentUserRequests(this.request.id).subscribe(data => {
      if (!data) {
        return;
      }
      Object.entries(data).forEach(([id, value]) => this.sentRequestsOfFriend.push({sentRequestId: id, ...value}));
      const [request] = this.sentRequestsOfFriend.filter(user => user.id === this.userId);

      this.sentRequestsService.cancelSentRequest(this.request.id, request.sentRequestId).subscribe(() => {
        this.refreshService.$refresh.next();
      });

      if (trueFalse) {
        this.receivedRequestsService.removeReceivedRequest(this.userId, this.request.requestId).subscribe(() => {
          this.refreshService.$refresh.next();
        });
      }
    });
  }
}
