import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {RefreshService} from '../../../user-page/services';
import {SentRequestsService} from '../../services';
import {User} from '../../../user-page/models';

@Component({
  selector: 'app-all-sent-requests',
  templateUrl: './all-sent-requests.component.html',
  styleUrls: ['./all-sent-requests.component.css']
})
export class AllSentRequestsComponent implements OnInit, OnDestroy {

  msg = 'loading ...';
  sentRequests: User[] = [];
  userId = this.router.getCurrentNavigation().extras.state.userId;
  url = this.router.url;
  userUrl = `/user/${this.userId}/sent_requests`;
  pageOwnerId: string;

  refSub: Subscription;

  constructor(private router: Router,
              private sentRequest: SentRequestsService,
              private refreshService: RefreshService) {
    this.getSentRequests();
  }

  ngOnInit(): void {
    const [, , pageOwnerId] = this.router.url.split('/');
    this.pageOwnerId = pageOwnerId;

    this.refSub = this.refreshService.$refresh.subscribe(() => {
      this.sentRequests = [];
      this.getSentRequests();
    });
  }

  ngOnDestroy(): void {
    this.refSub.unsubscribe();
  }

  getSentRequests(): void {
    this.msg = 'loading ...';
    this.sentRequest.getSentUserRequests(this.userId).subscribe(data => {
      this.sentRequests = [];
      this.msg = null;
      if (!data) {
        return;
      }
      Object.entries(data).forEach(([id, value]) => this.sentRequests.push({sentRequestId: id, ...value}));
    });
  }

}
