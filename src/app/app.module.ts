import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// UI库
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { zorro } from './app-zorror-ui.module';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QueryAdminComponent } from './library/query-book/query-admin/query-admin.component';
import { QueryUserComponent } from './library/query-book/query-user/query-user.component';
import { ReturnBookComponent } from './library/return-book/return-book.component';
import { ManageBookComponent } from './library/manage-book/manage-book.component';
import { LoggerComponent } from './library/logger/logger.component';
import { RankBoardComponent } from './library/rank-board/rank-board.component';
import { NotFoundComponent } from './error/404/not-found.component';

// services
import { LoginService } from './login/login.service';
import { BookService } from './library/query-book/query-admin/query-book.service';
import { UserBookService } from './library/query-book/query-user/query-book.service';
import { ManageBookService } from './library/manage-book/manage-book.service';
import { LoggerService } from './library/logger/logger.service';
import { RankService } from './library/rank-board/rank-board.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from './login/auth.interceptor';
import { ResponseInterceptor } from './login/response.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageBookComponent,
    HeaderComponent,
    QueryAdminComponent,
    QueryUserComponent,
    LoginComponent,
    RegisterComponent,
    ReturnBookComponent,
    LoggerComponent,
    RankBoardComponent,
    NotFoundComponent
  ],
  imports: [
    zorro,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [BookService, LoginService, FormBuilder, ManageBookService, UserBookService, LoggerService, RankService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    }
  
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
