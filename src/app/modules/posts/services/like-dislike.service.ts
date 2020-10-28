import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UniversalId} from '../../user-page/models';

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {

  urlLikeDislike = 'https://likedislike-5c949.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  getAllPostLikes(postId: string): Observable<object | null> {
    return this.httpClient.get<object | null>(`${this.urlLikeDislike}${postId}.json`);
  }

  addLike(postId: string, userId: string): Observable<UniversalId> {
    return this.httpClient.post<UniversalId>(`${this.urlLikeDislike}${postId}.json`, {userId});
  }

  removeAllPostLikes(postId: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.urlLikeDislike}${postId}.json`);
  }

  removeLike(postId: string, likeId: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.urlLikeDislike}${postId}/${likeId}.json`);
  }

}
