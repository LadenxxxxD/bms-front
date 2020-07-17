import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private cookies: CookieService, private httpClient: HttpClient) { }

  checkToken(): any{
    const token = this.cookies.get("token");
    // const token = localStorage.getItem("token");
    const body = {
      token: token
    }
    console.log("检查token："+token+"是否失效。");
    if(token) {
      return this.httpClient.post<boolean>('http://localhost:8080/checkToken',{},{params:body});
    }
    else {
      console.log("token为空");
      return false;
    }
    
}

}
