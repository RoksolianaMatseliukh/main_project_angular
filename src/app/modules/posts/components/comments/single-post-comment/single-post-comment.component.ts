import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Comment} from '../../../models';
import {CommentService} from '../../../services';
import {RefreshService} from '../../../../user-page/services';
import {UserService} from '../../../../user-page/services';

@Component({
  selector: 'app-single-post-comment',
  templateUrl: './single-post-comment.component.html',
  styleUrls: ['./single-post-comment.component.css']
})
export class SinglePostCommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() userId: string;
  url = this.router.url;
  userUrl: string;
  senderId: string;
  pageOwnerId: string;
  noAvatar = '/assets/no-avatar.png';
  userPhoto: string;

  constructor(private router: Router,
              private commentService: CommentService,
              private userService: UserService,
              private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.userUrl = `/user/${this.userId}/posts`;

    const [, , senderId] = this.router.url.split('/');
    this.senderId = senderId;

    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.userService.getUser(this.comment.senderId).subscribe(data => {
      if (!data.img) {
        this.userPhoto = this.noAvatar;
        return;
      }
      this.userPhoto = data.img;
    });
  }

  removeComment(): void {
    this.commentService.removeComment(this.comment.postId, this.comment.id).subscribe(() => {
      this.refreshService.$refresh.next();
    });
  }

}
