import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {Router} from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private cookies: CookieService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /* 
      拦截所有http请求 加上带token的请求头
    */
  //  const token = localStorage.getItem('token');
    const token = this.cookies.get('token');
    const clonedRequest = request.clone({ headers: request.headers.set('a', token) }); //Authorization
    return next.handle(clonedRequest);
  }

  private handleData(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    // 拦截response状态码322（token失效）并跳转login页面
    switch (event.status) {
      case 322:
        console.log('not login') ;
        this.router.navigate(['/login']);
        return of(event) ;
        break ;
      default:
    }
    return throwError(event) ;
  }
}
