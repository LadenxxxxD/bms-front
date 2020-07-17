import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserInfo } from './userInfo.model';

import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authority: string = null;

  constructor(private httpClient: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    const body = {
      userName: userName,
      password: password
    }
    const obs = this.httpClient.post('http://localhost:8080/login', body);
    obs.subscribe((identity: any) => {
      this.authority = identity.authority;
    });
    return obs;
  }

  test(token: string): Observable<any> {
    const header = new HttpHeaders().set("a", "token");
    const body = {
      token: token
    }
    return this.httpClient.post('http://localhost:8080/test', body, { headers: header , params: body});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public getAuthority() {
    return this.authority;
  }

}
