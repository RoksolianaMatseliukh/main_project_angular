import {Component, Input, OnInit} from '@angular/core';

import {ReceivedRequestsService} from '../../../received-requests/services';
import {RefreshService} from '../../../user-page/services';
import {SentRequestsService} from '../../services';
import {User} from '../../../user-page/models';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-single-sent-request',
  templateUrl: './single-sent-request.component.html',
  styleUrls: ['./single-sent-request.component.css']
})
export class SingleSentRequestComponent implements OnInit {

  @Input() sentRequest: User;
  @Input() userId: string;
  @Input() pageOwnerId: string;
  requestsOfFriend: User[] = [];
  userPhoto: string;
  noAvatar = '/assets/no-avatar.png';

  constructor(private sentRequestsService: SentRequestsService,
              private refreshService: RefreshService,
              private receivedRequestsService: ReceivedRequestsService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(this.sentRequest.id).subscribe(data => {
      if (!data.img) {
        this.userPhoto = this.noAvatar;
        return;
      }
      this.userPhoto = data.img;
    });
  }

  cancelSentRequest(): void {
    this.receivedRequestsService.getReceivedUserRequests(this.sentRequest.id).subscribe(data => {
      if (!data) {
        return;
      }
      Object.entries(data).forEach(([id, value]) => this.requestsOfFriend.push({requestId: id, ...value}));
      const [request] = this.requestsOfFriend.filter(user => user.id === this.userId);

      this.receivedRequestsService.removeReceivedRequest(this.sentRequest.id, request.requestId).subscribe(() => {
        this.refreshService.$refresh.next();
      });
      this.sentRequestsService.cancelSentRequest(this.userId, this.sentRequest.sentRequestId).subscribe(() => {
        this.refreshService.$refresh.next();
      });
    });
  }
}
