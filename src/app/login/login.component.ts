import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  time: number = 2 * 60 * 60 * 1000;// cookie过期时间两个小时 2*60*60*1000
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  constructor(private cookies: CookieService, private fb: FormBuilder, private loginService: LoginService, private router: Router, private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }


  login(): void {
    const that = this;
    if (this.validateForm.value.userName == null || this.validateForm.value.userName == '' || this.validateForm.value.password == null || this.validateForm.value.password == '') {
      // console.log('用户名密码空，不向后端发送请求');
      return;
    }

    this.loginService.login(this.validateForm.value.userName, this.validateForm.value.password).subscribe((obs: any) => {
      this.loginService.setAuthority(obs.authority);
      this.loginService.setCurrentUser(this.validateForm.value.userName);
      //如果密码正确identity为true进入下一个页面
      this.cookies.set("token", obs.token, new Date(new Date().getTime() + this.time));
      // localStorage.setItem("token", obs.token);
      //后端返回的null类型被转为字符串
      if (obs.authority !== "null") {
        if (obs.authority == "admin") {
          that.router.navigate(['/library/queryAdmin']);
        }
        else if (obs.authority == "user") {
          that.router.navigate(['/library/queryUser']);
        }
      }
      else {
        this.message.create("error", '用户名或密码错误！');
      }
    });

  }

  // testToken(): void {
  //   if (localStorage.getItem("token") != null) {
  //     this.loginService.test(localStorage.getItem("token")).subscribe((res: any) => {
  //     });
  //   }
  //   else {
  //     console.log("localStorage里的token为空");
  //   }
  // }


}
