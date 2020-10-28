import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UniversalId, User} from '../../user-page/models';

@Injectable({
  providedIn: 'root'
})
export class SentRequestsService {

  urlSentRequest = 'https://sentrequests-c0a6f.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  getSentUserRequests(userId: string): Observable<object | null> {
    return this.httpClient.get<object | null>(`${this.urlSentRequest}${userId}.json`);
  }

  addSentRequest(friend: Partial<User>, userId: string): Observable<UniversalId> {
    return this.httpClient.post<UniversalId>(`${this.urlSentRequest}${userId}.json`, friend);
  }

  cancelSentRequest(userId: string, requestId: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.urlSentRequest}${userId}/${requestId}.json`);
  }

}
