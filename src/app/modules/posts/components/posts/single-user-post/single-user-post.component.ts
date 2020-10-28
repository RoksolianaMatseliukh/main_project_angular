import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CommentService, LikeDislikeService, PostService} from '../../../services';
import {GetAllUsersService} from '../../../../../../share/modules/all-users/services';
import {Like, Post} from '../../../models';
import {RefreshService} from '../../../../user-page/services';
import {User} from '../../../../user-page/models';
import {UserService} from '../../../../user-page/services';

@Component({
  selector: 'app-single-user-post',
  templateUrl: './single-user-post.component.html',
  styleUrls: ['./single-user-post.component.css']
})
export class SingleUserPostComponent implements OnInit {

  @Input() post: Post;
  @Input() userId: string;
  @Input() pageOwnerId: string;
  @Input() isFriend = false;
  msg = 'loading ...';
  url = this.router.url;
  userUrl: string;
  noAvatar = '/assets/no-avatar.png';
  userPhoto: string;
  arrOfLikes: string[] = [];
  arrOfLikesWithLikeId: Like[] = [];
  usersWhoLikedPost: User[] = [];
  showLikes = false;

  constructor(private router: Router,
              private postService: PostService,
              private userService: UserService,
              private getAllUsersService: GetAllUsersService,
              private refreshService: RefreshService,
              private commentService: CommentService,
              private likeDislikeService: LikeDislikeService) { }

  ngOnInit(): void {
    this.userUrl = `/user/${this.userId}/posts`;

    this.userService.getUser(this.post.senderId).subscribe(data => {
      if (!data.img) {
        this.userPhoto = this.noAvatar;
        return;
      }
      this.userPhoto = data.img;
    });

    this.likeDislikeService.getAllPostLikes(this.post.id).subscribe(data => {
      this.arrOfLikes = [];
      if (!data) {
        return;
      }
      Object.entries(data).forEach(([id, value]) => this.arrOfLikesWithLikeId.push({likeId: id, ...value}));
      Object.values(data).forEach(value => this.arrOfLikes.push(value.userId));
    });
  }

  removeFullPostInfo(): void {
    this.postService.removePost(this.userId, this.post.id).subscribe(() => {
      this.refreshService.$refresh.next();
    });

    this.commentService.removeAllPostComments(this.post.id).subscribe(() => {
      this.refreshService.$refresh.next();
    });

    this.likeDislikeService.removeAllPostLikes(this.post.id).subscribe(() => {
      this.refreshService.$refresh.next();
    });
  }

  like(): void {
    this.likeDislikeService.addLike(this.post.id, this.pageOwnerId).subscribe(() => {
      this.refreshService.$refresh.next();
    });
  }

  dislike(): void {
    const [singleLike] = this.arrOfLikesWithLikeId.filter(like => like.userId === this.pageOwnerId);
    this.likeDislikeService.removeLike(this.post.id, singleLike.likeId).subscribe(() => {
      this.refreshService.$refresh.next();
    });
  }

  isLikesShowed(): void {
    this.getData();
    this.showLikes = true;
  }

  getData(): void {
    this.msg = 'loading ...';
    this.getAllUsersService.getAllUsers().subscribe(data => {
      this.usersWhoLikedPost = [];
      if (!data) {
        this.msg = null;
        return;
      }
      Object.entries(data).forEach(([id, value]) => this.usersWhoLikedPost.push({id, ...value}));
      this.usersWhoLikedPost = this.usersWhoLikedPost.filter(user => this.arrOfLikes.includes(user.id));
      this.msg = null;
    });
  }
}
