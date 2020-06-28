
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hello-angular';
  ngOnInit() {
    registerLocaleData(zh);
  }
}
