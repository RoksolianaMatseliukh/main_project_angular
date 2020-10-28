import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Comment} from '../models';
import {UniversalId} from '../../user-page/models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  urlComments = 'https://allcomments-797cc.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  getAllPostComments(postId: string): Observable<object | null> {
    return this.httpClient.get<object | null>(`${this.urlComments}${postId}.json`);
  }

  addComment(comment: Comment, postId: string): Observable<UniversalId> {
    return this.httpClient.post<UniversalId>(`${this.urlComments}${postId}.json`, comment);
  }

  removeAllPostComments(postId: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.urlComments}${postId}.json`);
  }

  removeComment(postId: string, commentId: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.urlComments}${postId}/${commentId}.json`);
  }
}
