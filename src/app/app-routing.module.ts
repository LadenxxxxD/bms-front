import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { LibraryComponent } from './library/library.component';
import { QueryAdmiComponent } from './queryAdmi/queryAdmi.component';
import { TesttableComponent } from './testtable/testtable.component';
import { QueryUserComponent } from './queryUser/queryUser.component';
import { HeaderComponent } from "./header/header.component";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'library', component: HeaderComponent,
    // canActivate: [AuthLoginGuard],
    children: [
      { path: '', component: LibraryComponent },
      { path: 'queryAdmi', component: QueryAdmiComponent },
      { path: 'queryUser', component: QueryUserComponent },
      { path: 'test', component: TesttableComponent },
      // { path: 'details', component: DetailsComponent },
      // { path: 'books', component: BooksComponent }
    ]
  },
  { path: '404', component: LoginComponent },
  //放在最后确保前面完全执行
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
