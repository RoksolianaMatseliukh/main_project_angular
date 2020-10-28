import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {ReceivedRequestsService} from '../../services';
import {RefreshService} from '../../../user-page/services';
import {User} from '../../../user-page/models';

@Component({
  selector: 'app-all-received-requests',
  templateUrl: './all-received-requests.component.html',
  styleUrls: ['./all-received-requests.component.css']
})
export class AllReceivedRequestsComponent implements OnInit, OnDestroy {

  msg = 'loading ...';
  requests: User[] = [];
  userId = this.router.getCurrentNavigation().extras.state.userId;
  url = this.router.url;
  userUrl = `/user/${this.userId}/received_requests`;
  pageOwnerId: string;

  refSub: Subscription;

  constructor(private router: Router,
              private requestService: ReceivedRequestsService,
              private refreshService: RefreshService) {
    this.getAllRequests();
  }

  ngOnInit(): void {
    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.requests = [];
      this.getAllRequests();
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getAllRequests(): void {
    this.msg = 'loading ...';
    this.requestService.getReceivedUserRequests(this.userId).subscribe(data => {
      this.msg = null;
      this.requests = [];
      if (!data) {
        return;
      }
      Object.entries(data).forEach(([id, value]) => this.requests.push({requestId: id, ...value}));
    });
  }

}
