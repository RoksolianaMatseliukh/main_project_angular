import {ActivatedRoute, Router} from '@angular/router';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';

import {FriendsService} from '../../../friends/services';
import {GetAllUsersService} from '../../../../../share/modules/all-users/services';
import {MessagesService} from '../../../messages/services';
import {PostService} from '../../../posts/services';
import {ReceivedRequestsService} from '../../../received-requests/services';
import {RefreshService} from '../../services';
import {SentRequestsService} from '../../../sent-requests/services';
import {User} from '../../models';
import {UserService} from '../../services';

@Component({
  selector: 'app-user-buttons',
  templateUrl: './user-buttons.component.html',
  styleUrls: ['./user-buttons.component.css']
})
export class UserButtonsComponent implements OnInit, OnDestroy {

  @Input() url: string;
  @Input() userUrl: string;
  @Input() user: Partial<User>;
  @Output() showPage = new EventEmitter<boolean>();
  pageOwnerId: string;
  numOfFriends = 0;
  numOfPosts = 0;
  numOfReceivedReq = 0;
  numOfSentReq = 0;
  numOfOtherUsers = 0;
  numOfDialogues = 0;

  refSub: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private friendService: FriendsService,
              private postService: PostService,
              private receivedRequestService: ReceivedRequestsService,
              private sentRequestService: SentRequestsService,
              private messagesService: MessagesService,
              private refreshService: RefreshService,
              private getAllUsersService: GetAllUsersService) {
    this.getUserData();
  }

  ngOnInit(): void {
    this.refSub = this.refreshService.$refresh.subscribe(() => this.getUserData());

    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getUserData(): void {
    this.activatedRoute.params.subscribe(value => {
      this.friendService.getAllUserFriends(value.id).subscribe(data => {
        this.numOfFriends = 0;
        if (!data) {
          return;
        }
        this.numOfFriends = Object.keys(data).length;
      });

      this.postService.getAllUserPosts(value.id).subscribe(data => {
        this.numOfPosts = 0;
        if (!data) {
          return;
        }
        this.numOfPosts = Object.keys(data).length;
      });

      this.receivedRequestService.getReceivedUserRequests(value.id).subscribe(data => {
        this.numOfReceivedReq = 0;
        if (!data) {
          return;
        }
        this.numOfReceivedReq = Object.keys(data).length;
      });

      this.sentRequestService.getSentUserRequests(value.id).subscribe(data => {
        this.numOfSentReq = 0;
        if (!data) {
          return;
        }
        this.numOfSentReq = Object.keys(data).length;
      });

      this.messagesService.getAllUserMessages(value.id).subscribe(data => {
        this.numOfDialogues = 0;
        if (!data) {
          return;
        }

        const setOfObjects = new Set();

        Object.values(data).forEach(msg => {
          const {senderId, senderName, senderSurname, receiverId, receiverName, receiverSurname} = msg;
          if (msg.senderId === value.id) {
            setOfObjects.add(JSON.stringify({userId: receiverId, userName: receiverName, userSurname: receiverSurname}));
          }
          if (msg.receiverId === value.id) {
            setOfObjects.add(JSON.stringify({userId: senderId, userName: senderName, userSurname: senderSurname}));
          }
        });
        this.numOfDialogues = setOfObjects.size;
      });

      this.getAllUsersService.getAllUsers().subscribe(data => {
        if (!data) {
          return;
        }
        setTimeout(() => {
          this.numOfOtherUsers = Object.keys(data).length - 1 - this.numOfFriends - this.numOfReceivedReq - this.numOfSentReq;
          this.showPage.emit(true);
        }, 500);
      });
    });
  }
}
