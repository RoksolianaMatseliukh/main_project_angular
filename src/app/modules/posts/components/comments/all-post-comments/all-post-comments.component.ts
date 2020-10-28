import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Comment} from '../../../models';
import {CommentService} from '../../../services';
import {RefreshService} from '../../../../user-page/services';

@Component({
  selector: 'app-all-post-comments',
  templateUrl: './all-post-comments.component.html',
  styleUrls: ['./all-post-comments.component.css']
})
export class AllPostCommentsComponent implements OnInit, OnDestroy {

  @Input() userId: string;
  @Input() postId: string;
  @Input() userUrl: string;
  @Input() isFriend = false;
  @Input() pageOwnerId: string;
  msg = 'loading ...';
  comments: Comment[] = [];
  url = this.router.url;
  refSub: Subscription;

  constructor(private router: Router,
              private refreshService: RefreshService,
              private commentService: CommentService) {
    this.getPostComments();
  }

  ngOnInit(): void {
    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.comments = [];
      this.getPostComments();
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getPostComments(): void {
    setTimeout(() => {
      this.msg = 'loading ...';
      this.commentService.getAllPostComments(this.postId)
        .subscribe(data => {
          this.msg = null;
          if (!data) {
            return;
          }
          Object.entries(data).forEach(([id, value]) => this.comments.push({id, ...value}));
        });
    });

  }

}
