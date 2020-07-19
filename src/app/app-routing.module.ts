import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { QueryAdminComponent } from './library/query-book/query-admin/query-admin.component';
import { QueryUserComponent } from './library/query-book/query-user/query-user.component';
import { ReturnBookComponent } from './library/return-book/return-book.component';
import { ManageBookComponent } from './library/manage-book/manage-book.component';
import { LoggerComponent } from './library/logger/logger.component';
import { RankBoardComponent } from './library/rank-board/rank-board.component';
import { UserinfoComponent } from './library/userinfo/userinfo.component'
import { NotFoundComponent } from "./error/404/not-found.component";
import { AuthGuard } from './login/auth.guard';
import { RouterGuard } from './login/router.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'library', component: HeaderComponent,

    // 需要在顶部显示导航栏的页面写在children里面
    children: [
      { path: 'queryAdmin', component: QueryAdminComponent, canActivate: [AuthGuard, RouterGuard] },
      { path: 'queryUser', component: QueryUserComponent, canActivate: [RouterGuard] },
      { path: 'userInfo', component: UserinfoComponent },
      { path: 'returnBook', component: ReturnBookComponent, canActivate: [AuthGuard, RouterGuard] },
      { path: 'manageBook', component: ManageBookComponent, canActivate: [AuthGuard, RouterGuard] },
      { path: 'logger', component: LoggerComponent, canActivate: [AuthGuard, RouterGuard] },
      { path: 'rankBoard', component: RankBoardComponent },
    ]
  },
  { path: '404', component: NotFoundComponent },
  // 放在最后确保前面完全执行
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouterGuard]
})
export class AppRoutingModule { }
