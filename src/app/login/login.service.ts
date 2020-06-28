import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserInfo } from './userInfo.model';

import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(userId: String, password: String): Observable<any> {
    const httpparams = new HttpParams(
      {
        fromString: 'userId=' + userId + '&password=' + password
      });
    const findhttpOptions = {
      headers: new HttpHeaders({ 'content-Type': 'application/json' }),
      params: httpparams
    };

    return this.httpClient.get('http://localhost:8080/login', findhttpOptions);
  }


  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
