import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from "./header/header.component";
import { LibraryComponent } from "./library/library.component";


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
  { path: '404', component: LoginComponent },
  //放在最后确保前面完全执行
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
