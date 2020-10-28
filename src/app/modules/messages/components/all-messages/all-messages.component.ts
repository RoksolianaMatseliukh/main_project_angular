import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Message} from '../../models';
import {MessagesService} from '../../services';
import {RefreshService} from '../../../user-page/services';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.css']
})
export class AllMessagesComponent implements OnInit, OnDestroy {

  msg = 'loading ...';
  messages: Message[] = [];
  pageOwnerId: string;
  url = this.router.url;
  userId: string;

  refSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private messagesService: MessagesService,
              private userService: UserService,
              private refreshService: RefreshService) {
    this.getMessages();
  }

  ngOnInit(): void {
    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.messages = [];
      this.getMessages();
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getMessages(): void {
    this.msg = 'loading ...';
    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.activatedRoute.params.subscribe(value => {
      this.userId = value.id;

      this.messagesService.getAllUserMessages(pageOwnerId).subscribe(data => {
        this.messages = [];
        if (!data) {
          this.msg = null;
          return;
        }
        Object.entries(data).forEach(([id, singleMsg]) => this.messages.push({id, ...singleMsg}));

        this.messages = this.messages.filter(msg => (msg.receiverId === value.id) || (msg.senderId === value.id))
                                     .sort((a, b) => +a.time - +b.time);
        this.msg = null;
      });
    });
  }
}
