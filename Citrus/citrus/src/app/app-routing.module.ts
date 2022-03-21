import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageLayoutComponent } from './mainPage/components/main-page-layout/main-page-layout.component';
import { SpecPageGuard } from './services/spec-page-guard.service';

const routes: Routes = [
  { path: '', component: MainPageLayoutComponent, pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule) },
  {
    path: 'crossroad',
    loadChildren: () => import('./crossroad-page/crossroad-page.module')
      .then(m => m.CrossroadPageModule),
    canActivate: [SpecPageGuard]
  },
  {
    path: 'spec-choice',
    loadChildren: () => import('./spec-choice-page/spec-choice-page.module')
      .then(m => m.SpecChoicePageModule),
    canActivate: [SpecPageGuard]
  },
  {
    path: 'service-choice',
    loadChildren: () => import('./service-choice-page/service-choice-page.module')
      .then(m => m.ServiceChoicePageModule),
    canActivate: [SpecPageGuard]
  },
  {
    path: 'date-choice',
    loadChildren: () => import('./date-choice-page/date-choice-page.module')
      .then(m => m.DateChoicePageModule),
    canActivate: [SpecPageGuard]
  },
  {
    path: 'confirm-page',
    loadChildren: () => import('./confirm-page/confirm-page.module')
      .then(m => m.ConfirmPageModule),
    canActivate: [SpecPageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
