import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {

  url = 'https://allusers-6964f.firebaseio.com/allUsers.json';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<object | null> {
    return this.httpClient.get<object | null>(this.url);
  }

}
