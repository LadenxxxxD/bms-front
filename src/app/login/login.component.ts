import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

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
      console.log('用户名密码空，不向后端发送请求');
      return;
    }
    this.loginService.login(this.validateForm.value.userName, this.validateForm.value.password).subscribe((identity: any) => {

      //如果密码正确identity为true进入下一个页面
      localStorage.setItem("token", identity.token);
      // console.log(window.localStorage);
      //后端返回的null类型被转为字符串
      if (identity.authority !== "null") {
        if (identity.authority == "admin") {
          localStorage.setItem("identity", "admin");
          that.router.navigate(['/library/queryAdmin']);
        }
        else if (identity.authority == "user") {
          localStorage.setItem("identity", "user");
          that.router.navigate(['/library/queryUser']);
        }
      }
      else {
        alert('用户名或密码错误！');
      }
    });

  }

  testToken(): void {
    if (localStorage.getItem("token") != null) {
      this.loginService.test(localStorage.getItem("token")).subscribe((res: any) => {
      });
    }
    else {
      console.log("localStorage里的token为空");
    }
  }


}
