import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {CommentService} from '../../../services';
import {RefreshService} from '../../../../user-page/services';
import {UserService} from '../../../../user-page/services';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Input() userId: string;
  @Input() postId: string;
  form: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private userService: UserService,
              private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.myForm();
  }

  comment(): void {
    const now = new Date();
    const time = `${now.toLocaleDateString()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const [, , senderId] = this.router.url.split('/');
    const visibleFormValue = this.form.value;

    this.userService.getUser(senderId).subscribe(data => {
      const {name, surname} = data;
      this.commentService.addComment({...visibleFormValue, postId: this.postId, time,
                                              senderId, senderName: name, senderSurname: surname,
                                              pageOwnerId: this.userId}, this.postId)
        .subscribe(() => this.refreshService.$refresh.next());
    });

    this.myForm();
  }

  myForm(): void {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(null, Validators.required)
    });
  }
}
