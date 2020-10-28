import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UniversalId, User} from '../../user-page/models';

@Injectable({
  providedIn: 'root'
})
export class ReceivedRequestsService {

  urlRequest = 'https://friendrequest-62283.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  getReceivedUserRequests(userId: string): Observable<object | null> {
    return this.httpClient.get<object | null>(`${this.urlRequest}${userId}.json`);
  }

  addReceivedRequest(friend: User, userId: string): Observable<UniversalId> {
    return this.httpClient.post<UniversalId>(`${this.urlRequest}${userId}.json`, friend);
  }

  removeReceivedRequest(userId: string, requestId: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.urlRequest}${userId}/${requestId}.json`);
  }

}
