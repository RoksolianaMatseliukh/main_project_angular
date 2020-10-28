import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UniversalId, User} from '../../user-page/models';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  urlFriends = 'https://friends-f8763.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  getAllUserFriends(userId: string): Observable<object | null> {
    return this.httpClient.get<object | null>(`${this.urlFriends}${userId}.json`);
  }

  addFriend(friend: User, userId: string): Observable<UniversalId> {
    return this.httpClient.post<UniversalId>(`${this.urlFriends}${userId}.json`, friend);
  }

  removeFriend(userId: string, friendId: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.urlFriends}${userId}/${friendId}.json`);
  }
}
