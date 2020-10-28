import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {PostService} from '../../../services';
import {RefreshService} from '../../../../user-page/services';
import {UserService} from '../../../../user-page/services';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Input() userId: string;
  form: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private refreshService: RefreshService,
              private userService: UserService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.myForm();
  }

  post(): void {
    const now = new Date();
    const time = `${now.toLocaleDateString()}, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const [, , senderId] = this.router.url.split('/');
    const visibleFormValue = this.form.value;

    this.userService.getUser(senderId).subscribe(data => {
      const {name, surname, img} = data;
      this.postService
        .addPost({...visibleFormValue, time, senderId, senderName: name, senderSurname: surname, senderPhoto: img}, this.userId)
          .subscribe(() =>  this.refreshService.$refresh.next());
    });

    this.myForm();
  }

  myForm(): void {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(null, Validators.required),
      img: this.formBuilder.control(null, Validators.required)
    });
  }

}
