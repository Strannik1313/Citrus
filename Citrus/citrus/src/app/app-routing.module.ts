import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageLayoutComponent } from './mainPage/components/main-page-layout/main-page-layout.component';

const routes: Routes = [
  {path: '', component: MainPageLayoutComponent, pathMatch: 'full'},
  {path: 'login', loadChildren: ()=> import('./login-page/login-page.module').then(m=>m.LoginPageModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
