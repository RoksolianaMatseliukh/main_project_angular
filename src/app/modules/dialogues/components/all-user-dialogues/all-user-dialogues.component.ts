import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Dialogue} from '../../models';
import {MessagesService} from '../../../messages/services';
import {RefreshService} from '../../../user-page/services';

@Component({
  selector: 'app-all-user-dialogues',
  templateUrl: './all-user-dialogues.component.html',
  styleUrls: ['./all-user-dialogues.component.css']
})
export class AllUserDialoguesComponent implements OnInit, OnDestroy {

  msg = 'loading ...';
  dialogues: Dialogue[] = [];
  pageOwnerId: string;
  url = this.router.url;
  userUrl: string;

  refSub: Subscription;

  constructor(private router: Router,
              private messagesService: MessagesService,
              private refreshService: RefreshService) {
    this.getUserDialogues();
  }

  ngOnInit(): void {
    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.dialogues = [];
      this.getUserDialogues();
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getUserDialogues(): void {
    this.msg = 'loading ...';
    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.userUrl = `/user/${pageOwnerId}/dialogues`;

    this.messagesService.getAllUserMessages(pageOwnerId).subscribe(data => {
      this.dialogues = [];
      if (!data) {
        this.msg = null;
        return;
      }

      const setOfObjects = new Set();

      Object.values(data).forEach(msg => {
        const {senderId, senderName, senderSurname, receiverId, receiverName, receiverSurname} = msg;

        if (msg.senderId === pageOwnerId) {
          setOfObjects.add(JSON.stringify({userId: receiverId, userName: receiverName, userSurname: receiverSurname}));
        }
        if (msg.receiverId === pageOwnerId) {
          setOfObjects.add(JSON.stringify({userId: senderId, userName: senderName, userSurname: senderSurname}));
        }
      });

      const newObj = setOfObjects.values();
      for (let i = 0; i < setOfObjects.size; i++) {
        this.dialogues.push(JSON.parse(newObj.next().value));
      }
      this.msg = null;
    });
  }
}
