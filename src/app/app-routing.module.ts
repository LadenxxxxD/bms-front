import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { RevertComponent } from './revert/revert.component';
import { BookManageComponent } from './book-manage/book-manage.component';
import { LogsComponent } from './logs/logs.component';
import { RankingListComponent } from './ranking-list/ranking-list.component';

const routes: Routes = [

{
  path:'',
  redirectTo:'login',
  pathMatch:'full'
},
{
  path:'details',
  component: DetailsComponent
},

{
  path:'revert',
  component: RevertComponent
},
{
  path:'bookManage',
  component: BookManageComponent
},
{
  path:'logs',
  component: LogsComponent
},
{
  path:'rankingList',
  component: RankingListComponent
},
{
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
