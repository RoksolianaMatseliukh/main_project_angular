import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {GetAllUsersService} from '../../../../../share/modules/all-users/services';
import {RefreshService} from '../../../user-page/services';
import {User} from '../../../user-page/models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  form: FormGroup;
  userId: string | boolean;
  users: User[] = [];
  warning = false;
  refSub: Subscription;
  hidePass = true;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private refreshService: RefreshService,
              private getAllUsersService: GetAllUsersService) {
    this.getUsers();
  }

  ngOnInit(): void {
    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.users = [];
      this.getUsers();
    });

    this.myForm();
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  logIn(): void {
    const [filteredUser] = this.users.filter(user => user.login === this.form.value.login && user.password === this.form.value.password);
    if (!filteredUser) {
      this.warning = true;
      this.userId = false;

      this.myForm();
      return;
    }
    this.warning = false;
    this.userId = filteredUser.id;

    localStorage.setItem(filteredUser.id, JSON.stringify({login: filteredUser.login, password: filteredUser.password}));
    this.router.navigate(['user', this.userId]);
  }

  getUsers(): void {
    this.getAllUsersService.getAllUsers()
      .subscribe(data => {
        if (!data) {
          return;
        }
        Object.entries(data).forEach(([id, value]) => this.users.push({id, ...value}));
      });
  }

  myForm(): void {
    this.form = this.formBuilder.group({
      login: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, Validators.required)
    });
  }
}
