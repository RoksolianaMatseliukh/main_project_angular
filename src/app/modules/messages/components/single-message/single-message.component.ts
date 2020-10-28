import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Message} from '../../models';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css']
})
export class SingleMessageComponent implements OnInit {

  @Input() msg: Message;
  @Input() pageOwnerId: string;
  noAvatar = '/assets/no-avatar.png';
  userPhoto: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.userService.getUser(value.id).subscribe(data => {
        if (!data.img) {
          this.userPhoto = this.noAvatar;
          return;
        }
        this.userPhoto = data.img;
      });
    });
  }

}
