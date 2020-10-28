import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MessagesService} from '../../services';
import {RefreshService} from '../../../user-page/services';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {

  form: FormGroup;
  url = this.router.url;
  userId: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private refreshService: RefreshService,
              private messagesService: MessagesService,
              private userService: UserService) {
    this.myForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.userId = value.id;
    });

    this.myForm();
  }

  sentMessage(): void {
    const time = new Date().getTime();
    const [, , senderId] = this.router.url.split('/');
    const visibleFormValue = this.form.value;

    this.userService.getUser(senderId).subscribe(senderData => {
      const {name: senderName, surname: senderSurname} = senderData;

      this.userService.getUser(this.userId).subscribe(otherUserData => {
        const {name: receiverName, surname: receiverSurname} = otherUserData;

        // add msg to sender
        this.messagesService
          .addMessage({...visibleFormValue, time, senderId, senderName, senderSurname,
            receiverId: this.userId, receiverName, receiverSurname}, senderId)
          .subscribe(() => this.refreshService.$refresh.next());

        // add msg to receiver
        this.messagesService
          .addMessage({...visibleFormValue, time, senderId, senderName, senderSurname,
            receiverId: this.userId, receiverName, receiverSurname}, this.userId)
          .subscribe(() => this.refreshService.$refresh.next());
      });
    });

    this.myForm();
  }

  myForm(): void {
    this.form = this.formBuilder.group({
      body: this.formBuilder.control(null, Validators.required)
    });
  }

}
