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
  //ʱ��ע�͵���ǰ��֪��˭д��
  // login(userId: String, password: String): Observable<any> {
  //   const httpparams = new HttpParams(
  //     {
  //       fromString: 'userId=' + userId + '&password=' + password
  //     });
  //   const findhttpOptions = {
  //     headers: new HttpHeaders({ 'content-Type': 'application/json' }),
  //     params: httpparams
  //   };

  //   return this.httpClient.get('http://localhost:8080/login', findhttpOptions);
  // }

//ʱ��д��login
  login(userName: string, password: string):Observable<any> {
    console.log(userName+' '+password);
    const body = {
      userName: userName,
      password: password
    }
    if(userName == null || userName == '' || password == null || password == '') {
      //�п��Ƿ�����
      console.log('用户名密码空，不向后端发送请求');
    }
    else{
      return this.httpClient.post('http://localhost:8080/login', body);
    }
    
}

    test(token: string):Observable<any> {
      const header = new HttpHeaders().set("Content-Type", "application/json").set("a",token);
      const body = {
        token: token
      }
      console.log(window.localStorage);
      return this.httpClient.post('http://localhost:8080/test', body,{headers: header, params:body});
    }

  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
