import {Component, Input, OnInit} from '@angular/core';

import {ReceivedRequestsService} from '../../../received-requests/services';
import {RefreshService} from '../../../user-page/services';
import {SentRequestsService} from '../../../sent-requests/services';
import {User} from '../../../user-page/models';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-single-other-user',
  templateUrl: './single-other-user.component.html',
  styleUrls: ['./single-other-user.component.css']
})
export class SingleOtherUserComponent implements OnInit {

  @Input() otherUser: Partial<User>;
  @Input() userId: string;
  userPhoto: string;
  noAvatar = '/assets/no-avatar.png';

  constructor(private userService: UserService,
              private receivedRequestsService: ReceivedRequestsService,
              private sentRequestsService: SentRequestsService,
              private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.userService.getUser(this.otherUser.id).subscribe(data => {
      if (!data.img) {
        this.userPhoto = this.noAvatar;
        return;
      }
      this.userPhoto = data.img;
    });
  }

  sendRequest(): void {
    this.userService.getUser(this.userId).subscribe(data => {
      this.receivedRequestsService.addReceivedRequest({id: this.userId, ...data}, this.otherUser.id).subscribe(() => {
        this.refreshService.$refresh.next();
      });
    });

    this.sentRequestsService.addSentRequest(this.otherUser, this.userId).subscribe(() => {
      this.refreshService.$refresh.next();
    });
  }
}
