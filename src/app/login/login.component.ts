import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Routes, ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  oneUser: any;
  loginflg = false;
  subscription: Subscription;
  errorMessage: String;

  constructor(private service: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onClick(userId, password) {
    this.service.login(userId, password).subscribe(
      data => {this.loginflg = data;
        if(!this.loginflg) {
          this.errorMessage = "用户或密码错误";
        } else {
          this.router.navigate(['/details'], { queryParams: { user : userId }});
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
