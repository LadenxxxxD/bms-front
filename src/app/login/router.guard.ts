import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GuardService } from './routerGuard.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable({
    providedIn: 'root'
  })
export class RouterGuard implements CanActivate {

    constructor(private router: Router, private guardService: GuardService, private message: NzMessageService) {

    }

    // 路由守卫
    canActivate(): Promise<boolean> {
        return this.guardService.checkToken().toPromise().then(res => {
            if (res === true) {
                // console.log("后端解析token返回res且值为res："+res);
                return true;
            }else {
                // console.log("token有效返回为res有值，token已过期无效res为null且跳转到登录页面"+res);
                this.router.navigate(['/login']);
                this.message.create("error",'您的身份已过期请重新登录！');
                return false;
            }
        }
    );
}

  
}

