import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { LibraryComponent } from './library/library.component';
import { QueryAdmiComponent } from './queryAdmi/queryAdmi.component';
import { TesttableComponent } from './testtable/testtable.component';
import { QueryUserComponent } from './queryUser/queryUser.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'library',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'queryAdmi',
    component: QueryAdmiComponent
  },
  {
    path: 'queryUser',
    component: QueryUserComponent
  },
  {
    path: 'test',
    component: TesttableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
