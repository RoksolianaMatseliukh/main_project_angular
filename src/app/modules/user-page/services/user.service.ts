import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UniversalId, User} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlUsers = 'https://allusers-6964f.firebaseio.com/allUsers';

  constructor(private httpClient: HttpClient) { }

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.urlUsers}/${userId}.json`);
  }

  addUser(user: Partial<User>): Observable<UniversalId> {
    return this.httpClient.post<UniversalId>(`${this.urlUsers}.json`, user);
  }

  editUserInfo(user: Partial<User>, userId: string): Observable<User> {
    return this.httpClient.put<User>(`${this.urlUsers}/${userId}.json`, user);
  }

}
