import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { DetailsComponent } from './details/details.component';
import { LibraryComponent } from './library/library.component';
import { HeaderComponent } from './header/header.component';
<<<<<<< HEAD
import { QueryAdmiComponent } from './queryAdmi/queryAdmi.component';
import { TesttableComponent } from './testtable/testtable.component';
import { QueryUserComponent } from './queryUser/queryUser.component';
import { BookService } from './service/queryBooksAll.service';
=======
>>>>>>> 2a66dd5838117b3afcdfa6e70de3eb4f4c3f98d3

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    LibraryComponent,
<<<<<<< HEAD
    HeaderComponent,
    QueryAdmiComponent,
    QueryUserComponent,
    TesttableComponent
=======
    HeaderComponent
>>>>>>> 2a66dd5838117b3afcdfa6e70de3eb4f4c3f98d3
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BootstrapModalModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ModalModule.forRoot()

  ],
  providers: [BsModalService,BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
