import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {RefreshService} from '../../../user-page/services';
import {UserService} from '../../../user-page/services';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit {

  form: FormGroup;
  hidePass = true;
  hideConfirmPass = true;
  incorrectPassConf = false;
  minDate: Date;
  maxDate: Date;
  pageOwnerId: string;
  user = this.router.getCurrentNavigation().extras.state.user;
  url = this.router.url;
  userUrl: string;
  noAvatar = '/assets/no-avatar.png';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private userService: UserService,
              private refreshService: RefreshService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 0);
    this.maxDate = new Date(currentYear - 10, 0, 0);
  }

  ngOnInit(): void {
    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.userUrl = `/user/${pageOwnerId}/edit`;

    this.myForm();
  }

  updateData(): void {
    if (this.form.value.changedPassword === this.form.value.confirmPassword) {
      let changedBirthday = this.datePipe.transform(this.form.value.changedBirthday, 'MMMM d, y');

      if (!changedBirthday) {
        changedBirthday = this.user.birthday;
      }

      const changedBirthdayTime = new Date(changedBirthday);
      const timeDiff = Math.abs(Date.now() - changedBirthdayTime.getTime());
      const changedAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

      this.userService.editUserInfo({
        age: changedAge,
        birthday: changedBirthday,
        login: this.user.login,
        name: this.form.value.changedName || this.user.name,
        password: this.form.value.changedPassword || this.user.password,
        sex: this.user.sex,
        surname: this.form.value.changedSurname || this.user.surname,
        img: this.form.value.changedPhoto || this.user.img || this.noAvatar}, this.user.id)
        .subscribe(() =>  this.refreshService.$refresh.next());

      this.incorrectPassConf = false;

      this.router.navigate(['user', this.user.id]);
      return;
    }

    this.incorrectPassConf = true;
  }

  myForm(): void {
    this.form = this.formBuilder.group({
      changedName: this.formBuilder.control(null,
        Validators.pattern('^[a-zA-ZА-яЁёЇїъіІ]*$')
      ),
      changedSurname: this.formBuilder.control(null,
        Validators.pattern('^[a-zA-ZА-яЁёЇїъіІ]*$')
      ),
      changedBirthday: this.formBuilder.control(null),
      changedPhoto: this.formBuilder.control(null),
      changedPassword: this.formBuilder.control(null,
        Validators.pattern('^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*#?&]).{8,}$')
      ),
      confirmPassword: this.formBuilder.control(null)
    });
  }

}
