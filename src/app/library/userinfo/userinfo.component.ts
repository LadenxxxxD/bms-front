import { Component, OnInit } from '@angular/core';
import { UserinfoService } from './userinfo.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserInfo } from './userinfo.model';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  user: UserInfo = {
    userid: 0,
    username: '',
    authority: '',
    sex: '',
    birthday: '',
    email: '',
    grade: '',
    interest: '',
    description: '',
    comment: ''
  };

  userModal: UserInfo = {
    userid: 0,
    username: '',
    authority: '',
    sex: '',
    birthday: '',
    email: '',
    grade: '',
    interest: '',
    description: '',
    comment: ''
  };

  constructor(private userinfoService: UserinfoService, private loginService: LoginService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userinfoService.getUserInfo(this.loginService.getCurrentUser()).subscribe((user: UserInfo) => {
      this.user.userid = this.userModal.userid = user.userid;
      this.user.username = this.userModal.username = user.username;
      this.user.sex = this.userModal.sex = user.sex;
      this.user.authority = this.userModal.authority = user.authority;
      this.user.birthday = this.userModal.birthday = user.birthday;
      this.user.email = this.userModal.email = user.email;
      this.user.grade = this.userModal.grade = user.grade;
      this.user.interest = this.userModal.interest = user.interest;
      this.user.description = this.userModal.description = user.comment;
    });
  }

  edit() {
    this.isVisible = true;
  }

  update() {
    this.isOkLoading = true;
    setTimeout(() => {
      this.userinfoService.updateUserInfo(this.userModal).subscribe(result => {
        result ? this.message.create("success", "更新成功！") : this.message.create("error", "更新失败！");
        this.isOkLoading = false;
        this.isVisible = false;
        this.getData();
      });
    }, 2000);
  }

  handleCancel() {
    this.isVisible = false;
  }

}
