import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageLayoutWrapperComponent } from '@components/wrappers/main-page-layout-wrapper/main-page-layout-wrapper.component';
import { AuthGuardService } from '@services/auth-guard.service';
import { NavigateAccess } from '@services/navigate-access.service';

const routes: Routes = [
	{
		path: '',
		component: MainPageLayoutWrapperComponent,
		pathMatch: 'full',
	},
	{
		path: 'deal',
		loadChildren: () =>
			import('@modules/wizard/wizard.module').then(m => m.WizardModule),
		canActivate: [NavigateAccess],
	},
	{
		path: 'register',
		loadChildren: () =>
			import('@modules/register-page/register-page.module').then(
				m => m.RegisterPageModule,
			),
		canActivate: [NavigateAccess],
	},
	{
		path: 'login',
		loadChildren: () =>
			import('@modules/login-page/login-page.module').then(
				m => m.LoginPageModule,
			),
		canActivate: [NavigateAccess],
	},
	{
		path: 'account',
		loadChildren: () =>
			import('@modules/account-page/account-page.module').then(
				m => m.AccountPageModule,
			),
		canActivate: [AuthGuardService, NavigateAccess],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
