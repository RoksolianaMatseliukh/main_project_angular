import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Post} from '../models';
import {UniversalId} from '../../user-page/models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  urlPosts = 'https://allposts-19523.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  getAllUserPosts(userId: string): Observable<object | null> {
    return this.httpClient.get<object | null>(`${this.urlPosts}${userId}.json`);
  }

  addPost(post: Post, userId: string): Observable<UniversalId> {
    return this.httpClient.post<UniversalId>(`${this.urlPosts}${userId}.json`, post);
  }

  removePost(userId: string, postId: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.urlPosts}${userId}/${postId}.json`);
  }

}
