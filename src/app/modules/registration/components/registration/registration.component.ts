import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {GetAllUsersService} from '../../../../../share/modules/all-users/services';
import {RefreshService} from '../../../user-page/services';
import {Subscription} from 'rxjs';
import {User} from '../../../user-page/models';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  form: FormGroup;
  lastRegisteredUserId: string | boolean;
  users: User[] = [];
  warning = false;
  warningPassConf = false;
  refSub: Subscription;
  hidePass = true;
  hidePassConfirm = true;
  minDate: Date;
  maxDate: Date;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private userService: UserService,
              private refreshService: RefreshService,
              private getAllUsersService: GetAllUsersService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 8, 11, 31);

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

  saveUser(): void {
    if (this.form.value.password === this.form.value.confirmPassword) {
      const [filteredUser] = this.users.filter(user => user.login === this.form.value.login);

      if (!filteredUser) {
        const birthday = this.datePipe.transform(this.form.value.birthday, 'MMMM d, y');

        const birthdayTime = new Date(birthday);
        const timeDiff = Math.abs(Date.now() - birthdayTime.getTime());
        const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

        const {name, surname, login, password, sex} = this.form.value;
        this.userService.addUser({name, surname, login, password, sex, age, birthday}).subscribe(value => {
          this.lastRegisteredUserId = value.name;
          this.refreshService.$refresh.next();
        });

        this.warning = false;
        this.warningPassConf = false;
        return;
      }

      this.warning = true;
      this.warningPassConf = false;
      this.lastRegisteredUserId = false;
      return;
    }

    this.warning = false;
    this.warningPassConf = true;
    this.lastRegisteredUserId = false;
  }

  logIn(): void {
    localStorage.setItem(this.lastRegisteredUserId as string,
      JSON.stringify({login: this.form.controls.login.value, password: this.form.controls.password.value}));
    this.router.navigate(['user', this.lastRegisteredUserId]);
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
      name: this.formBuilder.control(null, [
        Validators.required,
        Validators.pattern('^[a-zA-ZА-яЁёЇїъіІ]*$')
      ]),
      surname: this.formBuilder.control(null, [
        Validators.required,
        Validators.pattern('^[a-zA-ZА-яЁёЇїъіІ]*$')
      ]),
      sex: this.formBuilder.control(null, [
        Validators.required
      ]),
      birthday: this.formBuilder.control(null, [
        Validators.required
      ]),
      login: this.formBuilder.control(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: this.formBuilder.control(null, [
        Validators.required,
        Validators.pattern('^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*#?&]).{8,}$')
      ]),
      confirmPassword: this.formBuilder.control(null, [
        Validators.required
      ])
    });
  }

}
