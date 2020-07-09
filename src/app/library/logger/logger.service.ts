import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(private httpClient: HttpClient){}
  public getLoginLog(){
    return this.httpClient.post('http://localhost:8080/getLoginLog',null);
  }
  public getBookLog(){
    return this.httpClient.post('http://localhost:8080/getBookLog',null);
  }
}
