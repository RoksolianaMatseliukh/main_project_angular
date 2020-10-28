import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {RefreshService} from '../../services';
import {User} from '../../models';
import {UserService} from '../../services';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {

  user: Partial<User>;
  url = this.router.url;
  userUrl: string;
  value = 0;
  pageOwnerId: string;
  showPage = false;

  refSub: Subscription;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private refreshService: RefreshService) {
    this.getUser();
  }

  ngOnInit(): void {
    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.user = {};
      this.getUser();
    });

    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  logOut(): void {
    localStorage.removeItem(this.user.id);
    this.router.navigate(['sign_in']);
  }

  getUser(): void {
    this.activatedRoute.params.subscribe(value => {
      this.userUrl = `/user/${value.id}`;
      this.userService.getUser(value.id).subscribe(user => {
        this.user = {id: value.id, ...user};
      });
    });
  }
}
