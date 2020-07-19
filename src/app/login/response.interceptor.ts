import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { tap } from 'rxjs/operators'
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor( private router: Router, private message: NzMessageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        tap(response => {
       
        },
          error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 322) {
                    // token 失效
                  this.router.navigate(['/login']);
                  this.message.create("error",'您的身份已过期请重新登录！');
                }
            }
          }
        )
    )
  }
}