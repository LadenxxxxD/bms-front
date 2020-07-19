import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserInfo } from './userinfo.model';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(private httpClient: HttpClient) { }

  public getUserInfo(userName: string) {
    const param = new HttpParams().set("userName", userName);
    return this.httpClient.get('http://localhost:8080/api/user/getUserInfo', { params: param });
  }
  public updateUserInfo(user: UserInfo) {
    return this.httpClient.post('http://localhost:8080/api/user/updateUserInfo', user);
  }

}
