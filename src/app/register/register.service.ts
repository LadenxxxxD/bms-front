import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserInfo } from './userInfo.model';

import {logger} from 'codelyzer/util/logger';
import {log} from 'util';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  register(newUser): Observable<any> {

    console.log(newUser)

    //下面这个没反应
    const httpparams = new HttpParams(
      {
        fromString:'username=' + newUser.username + '&password=' + newUser.password
    });
    const addhttpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/json'}),
      params: httpparams
    };
     return this.httpClient.post<boolean>('http://localhost:8080/register',newUser);
    //  --------------------------------------------------------------------------------------
    // return this.httpClient.post<boolean>('http://localhost:8080/register', newUser);

  }


  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      log(`${operation} failed: ${error.message}`);

      return of(result as T);
      };
  }

}
