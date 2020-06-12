import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { RevertComponent } from './revert/revert.component';
import { BookManageComponent } from './book-manage/book-manage.component';
import { LogsComponent } from './logs/logs.component';
import { RankingListComponent } from './ranking-list/ranking-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    RevertComponent,
    BookManageComponent,
    LogsComponent,
    RankingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BootstrapModalModule,

    ModalModule.forRoot()

  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
