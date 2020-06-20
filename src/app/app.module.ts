import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BootstrapModalModule,
    NgZorroAntdModule,
    ModalModule.forRoot()

  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
