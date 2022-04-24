import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageLayoutComponent } from './mainPage/main-page-layout/main-page-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NavigateAccess } from './services/navigate-access.service';

const routes: Routes = [
  { path: '', component: MainPageLayoutComponent, pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login-page/login-page.module')
      .then(m => m.LoginPageModule),
      canActivate: [NavigateAccess]
  },
  {
    path: 'account',
    loadChildren: () => import('./account-page/account-page.module')
      .then(m => m.AccountPageModule),
      canActivate: [AuthGuardService, NavigateAccess]
  },
  {
    path: 'register',
    loadChildren: () => import('./register-page/register-page.module')
      .then(m => m.RegisterPageModule),
      canActivate: [NavigateAccess]
  },
  {
    path: 'crossroad',
    loadChildren: () => import('./crossroad-page/crossroad-page.module')
      .then(m => m.CrossroadPageModule),
    canActivate: [NavigateAccess]
  },
  {
    path: 'spec-choice',
    loadChildren: () => import('./spec-choice-page/spec-choice-page.module')
      .then(m => m.SpecChoicePageModule),
    canActivate: [NavigateAccess]
  },
  {
    path: 'service-choice',
    loadChildren: () => import('./service-choice-page/service-choice-page.module')
      .then(m => m.ServiceChoicePageModule),
    canActivate: [NavigateAccess]
  },
  {
    path: 'date-choice',
    loadChildren: () => import('./date-choice-page/date-choice-page.module')
      .then(m => m.DateChoicePageModule),
    canActivate: [NavigateAccess]
  },
  {
    path: 'confirm-page',
    loadChildren: () => import('./confirm-page/confirm-page.module')
      .then(m => m.ConfirmPageModule),
    canActivate: [NavigateAccess]
  },
  {
    path: '**', component: MainPageLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
