import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Message} from '../models';
import {UniversalId} from '../../user-page/models';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  urlMessages = 'https://messages-3f864.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  getAllUserMessages(userId: string): Observable<object | null> {
    return this.httpClient.get<object | null>(`${this.urlMessages}${userId}.json`);
  }

  addMessage(msg: Message, userId: string): Observable<UniversalId> {
    return this.httpClient.post<UniversalId>(`${this.urlMessages}${userId}.json`, msg);
  }

}
