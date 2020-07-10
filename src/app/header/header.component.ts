
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../login/login.service";

const adminMap = [
  {
    title: '查询借阅',
    url: '/library/queryAdmin',
  },
  {
    title: '图书归还',
    url: '/library/returnBook',
  },
  {
    title: '图书管理',
    url: '/library/manageBook',
  },
  {
    title: '日志',
    url: '/library/logger',
  },
  {
    title: '排行榜',
    url: '/library/rankBoard',
  }
];
const userMap = [
  {
    title: '查询借阅',
    url: '/library/queryUser',
  },
  {
    title: '个人信息',
    url: '/library/information',
  },
  {
    title: '排行榜',
    url: '/library/rankBoard',
  }
]

// < li nz-menu - item routerLink = "/library/queryAdmin" nzSelected > 查询借阅 < /li>
//   < li nz - menu - item routerLink = "/library/returnBook" > 归还 < /li>
//     < li nz - menu - item routerLink = "/library/manageBook" > 图书管理 < /li>
//       < li nz - menu - item routerLink = "/library/logger" > 日志 < /li>
//         < li nz - menu - item routerLink = "/library/rankBoard" > 排行榜 < /li>
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  navigateMap = userMap;
  type = '1';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.loginService.getAuthority() === 'admin') {
      this.navigateMap = adminMap;
    }
  }

  // public tagClick(type) {
  //   this.type = type;
  //   const url = navigateMap[type];
  //   if (url) {
  //     this.router.navigate([url]);
  //   }
  // }

}


