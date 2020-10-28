import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {FriendsService} from '../../services';
import {RefreshService} from '../../../user-page/services';
import {User} from '../../../user-page/models';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-single-friend',
  templateUrl: './single-friend.component.html',
  styleUrls: ['./single-friend.component.css']
})
export class SingleFriendComponent implements OnInit {

  @Input() friend: User;
  @Input() userId: string;
  @Input() pageOwnerId: string;
  url = this.router.url;
  userUrl: string;
  friendsOfFriend: User[] = [];
  userPhoto: string;
  noAvatar = '/assets/no-avatar.png';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private friendService: FriendsService,
              private refreshService: RefreshService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userUrl = `/user/${this.userId}/friends`;

    this.userService.getUser(this.friend.id).subscribe(data => {
      if (!data.img) {
        this.userPhoto = this.noAvatar;
        return;
      }
      this.userPhoto = data.img;
    });
  }

  removeFriend(): void {
      this.friendService.getAllUserFriends(this.friend.id).subscribe(data => {
        if (!data) {
          return;
        }
        Object.entries(data).forEach(([id, value]) => this.friendsOfFriend.push({friendId: id, ...value}));
        const [friend] = this.friendsOfFriend.filter(user => user.id === this.userId);

        this.friendService.removeFriend(this.friend.id, friend.friendId).subscribe(() => {
          this.refreshService.$refresh.next();
        });
        this.friendService.removeFriend(this.userId, this.friend.friendId).subscribe(() => {
          this.refreshService.$refresh.next();
        });
      });
  }
}
