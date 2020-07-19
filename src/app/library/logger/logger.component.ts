import { Component, OnInit } from '@angular/core';
import { LoggerService } from './logger.service';

export interface LoginLog {
  userId: string;
  userName: string;
  registerDatetime: string;
}
export interface BookLog {
  userId: string;
  bookId: string;
  rentalDatetime: string;
  returnDatetime: string;
}
@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

  constructor(private loggerService: LoggerService) { }
  type: string = '1';

  loginColumns = ['用户ID', '用户名', '登录时间'];
  bookColumns = ['用户ID', '图书ID', '借阅时间', '归还时间'];
  loginLog: LoginLog;
  bookLog: BookLog;

  // csv配置项
  currentColumns: any;
  currentData: any;
  csvFileName: string;



  ngOnInit(): void {
    this.showTable("1");
    this.loggerService.getLoginLog().subscribe((loginLog: LoginLog) => {
      this.loginLog = loginLog;
    });
    this.loggerService.getBookLog().subscribe((bookLog: BookLog) => {
      this.bookLog = bookLog;
    });
  }

  showTable(type: string) {
    this.type = type;
  }

  // <th nzAlign="center"> 用户ID < /th>
  // <th nzAlign="center"> 图书ID < /th>
  // <th nzAlign="center"> 借阅时间 < /th>
  // <th nzAlign="center"> 归还时间 < /th>
  exportCSV() {
    this.currentColumns = this.type == '1' ? this.loginColumns : this.bookColumns;
    this.currentData = this.type == '1' ? this.loginLog : this.bookLog;
    this.csvFileName = this.type == '1' ? '登录日志' : '借还日志';

    let str = "\ufeff"; // 存放将被解析成CSV文件的字符串

    // csv标题
    for (let item of this.currentColumns) {
      str += item.toString() + ',';
    }

    str += '\n';

    // csv正文
    for (let item in this.currentData) {
      for (let key in this.currentData[item]) {
        if (this.currentData[item][key] === null) {
          str += '"",';
          continue;
        }
        str += '"' + this.currentData[item][key].toString() + '"' + ',';
      }
      str += "\n";
    }

    console.log(str);


    const blob = new Blob([str], {
      type: 'text/csv;charset=utf-8;'
    });
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, this.csvFileName + '.csv');
    } else {
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', this.csvFileName + '.csv');
        link.click();
      } else {
        str = 'data:text/csv;charset=utf-8,' + str;
        window.open(encodeURI(str));
      }
      document.body.removeChild(link);
    }
  }



}