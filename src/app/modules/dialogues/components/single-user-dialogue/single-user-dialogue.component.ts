import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Dialogue} from '../../models';
import {Message} from '../../../messages/models';
import {MessagesService} from '../../../messages/services';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-single-user-dialogue',
  templateUrl: './single-user-dialogue.component.html',
  styleUrls: ['./single-user-dialogue.component.css']
})
export class SingleUserDialogueComponent implements OnInit {

  @Input() dialogue: Dialogue;
  @Input() pageOwnerId: string;
  url = this.router.url;
  userUrl: string;
  noAvatar = '/assets/no-avatar.png';
  userPhoto: string;
  allMsg: Message[] = [];

  constructor(private router: Router,
              private messageService: MessagesService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userUrl = `/user/${this.pageOwnerId}/dialogues`;
    this.userService.getUser(this.dialogue.userId).subscribe(data => {
      if (!data.img) {
        this.userPhoto = this.noAvatar;
        return;
      }
      this.userPhoto = data.img;
    });

    this.messageService.getAllUserMessages(this.dialogue.userId).subscribe(data => {
      Object.values(data).forEach(msg => {
        this.allMsg.push(msg);
      });
      this.allMsg = this.allMsg.filter(eachMsg => (eachMsg.senderId === this.pageOwnerId) || (eachMsg.receiverId === this.pageOwnerId));

      // 1)
      // const lastTime = Math.max.apply(Math, this.allMsg.map(obj => obj.time));
      // const [lastMsg] = this.allMsg.filter(eachMsg => eachMsg.time === lastTime);
      // const {body, time} = lastMsg;
      // this.dialogue = Object.assign(this.dialogue, {body, time});

      // 2)
      // this.dialogue = Object.assign(this.dialogue, this.allMsg[this.allMsg.length - 1]);

      // 3)
      const [lastMsg] = this.allMsg.sort((a, b) =>  +b.time - +a.time);
      const {body, time} = lastMsg;
      this.dialogue = Object.assign(this.dialogue, {body, time});
    });
  }
}
