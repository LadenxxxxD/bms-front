import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /* 
      拦截所有http请求 加上带token的请求头
    */
    const token = localStorage.getItem('token');
    const clonedRequest = request.clone({ headers: request.headers.set('a', token) }); //Authorization
    return next.handle(clonedRequest);
  }
}
