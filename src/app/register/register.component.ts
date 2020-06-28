import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Routes, ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';

import { Subscription, of } from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';
import { RegisterService } from './register.service';

const options = [
  {
    value: '17级',
    label: '17级',
    children: [
      {
        value: '计算机科学与软件学院',
        label: '计算机科学与软件学院',
        children: [
          {
            value: '软件工程',
            label: '软件工程',
            isLeaf: true
          },
          {
            value: '计算机科学',
            label: '计算机科学',
            isLeaf: true
          }
        ]
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }
    ]
  },
  {
    value: '16级',
    label: '16级',
    children: [
      {
        value: '计算机科学与软件学院',
        label: '计算机科学与软件学院',
        children: [
          {
            value: '软件工程',
            label: '软件工程',
            isLeaf: true
          },
          {
            value: '计算机科学',
            label: '计算机科学',
            isLeaf: true
          }
        ]
      },
      {
        value: '其他',
        label: '其他',
        isLeaf: true
      }
    ]
  }
];

@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService) { }

  validateForm!: FormGroup;
  registerFlg: boolean //注册成败标志


  // 年级组件部分--------------------------

  Needgrade: boolean = false;//提示用
  nzOptions: NzCascaderOption[] = options;
  grade: string[] | null = null;
  gradeChanges(values: string[]): void {
    // console.log(values);
    // console.log(this.grade);
    // this.grade = values;
  }
  // ----------------年级组件end---------------------

  // 兴趣爱好多选组件---------------
  allChecked = false;
  indeterminate = true;
  hobbyArray = [
    { label: '游泳', value: '游泳', checked: true },
    { label: '乒乓', value: '乒乓', checked: false },
    { label: '跑步', value: '跑步', checked: false },
    { label: '羽毛球', value: '羽毛球', checked: false },
    { label: '虚拟现实', value: 'VR', checked: false },
  ];

  updateAllChecked(): void {
    console.log('updateAllChecked')
    // console.log(this.allChecked)
    this.indeterminate = false;
    if (this.allChecked) {
      this.hobbyArray = this.hobbyArray.map(item => {
        console.log('全选')
        return {
          ...item,
          checked: true
        };
      });
      console.log(this.hobbyArray)
    } else {
      this.hobbyArray = this.hobbyArray.map(item => {
        console.log('非全选')
        return {
          ...item,
          checked: false
        };
      });
      console.log(this.hobbyArray)
    }
  }

  updateSingleChecked(): void {
    console.log(' updateSingleChecked')
    //是否都没被选
    if (this.hobbyArray.every(item => !item.checked)) {//es5 对于数组每一个元素执行一个函数，如果都返回true，则最终返回true，否则返回false。  
      this.allChecked = false;
      this.indeterminate = false;
      // console.log(this.indeterminate)
      //是否全选
    } else if (this.hobbyArray.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
      console.log(this.allChecked)
      console.log(this.indeterminate)
      // 选了但是没有全选
    } else {
      this.allChecked = false;
      this.indeterminate = true;

    }
  }
  // -----------兴趣爱好部分end---------------


  //提交注册请求
  submitForm(): void {

    let formError = false
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();//通过UI更改控件值时 响应？
      this.validateForm.controls[i].updateValueAndValidity();//更新状态啥的

      //这里来判断有没有不合法的  有一个以上就吧error标记为true  不让提交注册请求
      if (this.validateForm.controls[i].errors) {
        formError = true;  //给后面用 因为年级不在这里 和后面一起判断
      }
    }
    // console.log(this.validateForm.controls)
    // console.log(this.hobbyArray)
    // console.log(this.grade)

    //处理grade数据
    let gradeString = ''
    if (this.grade != null && this.grade != []) {
      this.grade.forEach(v => {
        gradeString = gradeString + v + '/'
        console.log(v)
      })
    }

    //处理兴趣数据
    let interest = ''
    this.hobbyArray.forEach(v => {
      if (v.checked == true) {
        interest = interest + v.value + '/'
      }
    })

    let user_name = this.validateForm.controls.nickname.value
    let password = this.validateForm.controls.password.value
    let description = this.validateForm.controls.userType.value
    let authority = this.validateForm.controls.userType.value
    let email = this.validateForm.controls.email.value
    let birthday = this.validateForm.controls.birthday.value
    let sex = this.validateForm.controls.sexValue.value
    let grade = gradeString
    let comment = this.validateForm.controls.comment.value

    // console.log(formError)
    // console.log(grade)

    //符合所有条件 user_name && password && description && authority && email && birthday && sex && grade &&!formError 
    if (user_name && password && description && authority && email && birthday && sex && grade && !formError) {
      this.Needgrade = false
      let newUser = {
        // user_id = this.validateForm.controls.
        user_name: this.validateForm.controls.nickname.value,
        password: this.validateForm.controls.password.value,
        description: this.validateForm.controls.userType.value,
        authority: this.validateForm.controls.userType.value,
        email: this.validateForm.controls.email.value,
        birthday: this.validateForm.controls.birthday.value,
        sex: this.validateForm.controls.sexValue.value,
        grade: gradeString,
        interest: interest,
        comment: this.validateForm.controls.comment.value,
      }
      console.log(newUser)

      this.registerService.register(newUser).subscribe(
        data => {
          this.registerFlg = data;
          if (!this.registerFlg) {
            alert('注册失败，请检查网络是否在开小车~')
          } else {
            alert('注册成功')
            // this.router.navigate(['/details'], { queryParams: { user : userId }});
          }
        });

    }
    else if (grade) {
      this.Needgrade = false
      alert('请检查注册信息~')
    }
    else if (!grade) {
      this.Needgrade = true
      alert('请检查注册信息~')
    }





  }



  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }



  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      birthday: [null, [Validators.required]],//生日
      sexValue: [null, [Validators.required]],
      userType: [null, [Validators.required]],

      comment: ['',]
    });
  }



  return() {
    this.router.navigate(['login']);

  }

  register() {
    // alert(this.fb.group);
    console.log("this.fb.group");
  }
}
