import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {GetAllUsersService} from '../../services';
import {RefreshService} from '../../../../../app/modules/user-page/services';
import {User} from '../../../../../app/modules/user-page/models';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {

  msg = 'loading ...';
  users: User[] = [];
  refSub: Subscription;

  constructor(private refreshService: RefreshService,
              private getAllUsersService: GetAllUsersService) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.users = [];
      this.getAllUsers();
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getAllUsers(): void {
    this.getAllUsersService.getAllUsers().subscribe(data => {
      this.msg = null;
      if (!data) {
        return;
      }
      Object.entries(data).forEach(([id, value]) => this.users.push({id, ...value}));
    });
  }

}
