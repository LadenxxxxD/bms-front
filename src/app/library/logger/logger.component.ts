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

  loginLog: LoginLog;
  bookLog: BookLog;
  type: string;
  showTable(type: string) {
    this.type = type;
  }
  ngOnInit(): void {
    this.showTable("1");
    this.loggerService.getLoginLog().subscribe((loginLog: LoginLog) => {
      this.loginLog = loginLog;
    });
    this.loggerService.getBookLog().subscribe((bookLog: BookLog) => {
      this.bookLog = bookLog;
    });
  }

}
