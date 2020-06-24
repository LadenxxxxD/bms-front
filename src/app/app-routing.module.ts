import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { DetailsComponent } from './details/details.component';
import { LibraryComponent } from './library/library.component';
import { QueryAdmiComponent } from './queryAdmi/queryAdmi.component';
import { TesttableComponent } from './testtable/testtable.component';
import { QueryUserComponent } from './queryUser/queryUser.component';
=======
import { HeaderComponent } from "./header/header.component";
import { LibraryComponent } from "./library/library.component";
>>>>>>> 2a66dd5838117b3afcdfa6e70de3eb4f4c3f98d3


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'library', component: HeaderComponent,
    // canActivate: [AuthLoginGuard],
    children: [
      { path: '', component: LibraryComponent },
      // { path: 'details', component: DetailsComponent },
      // { path: 'books', component: BooksComponent }
    ]
  },
<<<<<<< HEAD
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
=======
  { path: '404', component: LoginComponent },
  //放在最后确保前面完全执行
  { path: '**', redirectTo: '404' },
>>>>>>> 2a66dd5838117b3afcdfa6e70de3eb4f4c3f98d3
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
