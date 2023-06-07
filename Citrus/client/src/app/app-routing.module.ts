import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainPageLayoutWrapperComponent } from '@components/main-page-layout-wrapper/main-page-layout-wrapper.component';

const routes: Routes = [
	{
		path: '',
		component: MainPageLayoutWrapperComponent,
		pathMatch: 'full',
	},
	{
		path: 'deal',
		loadChildren: () => import('@components/wizard/wizard.module').then(m => m.WizardModule),
	},
	// {
	// 	path: 'register',
	// 	loadChildren: () => import('@modules/register-page/register-page.module').then(m => m.RegisterPageModule),
	// 	canActivate: [NavigateAccess],
	// },
	// {
	// 	path: 'login',
	// 	loadChildren: () => import('@modules/login-page/login-page.module').then(m => m.LoginPageModule),
	// 	canActivate: [NavigateAccess],
	// },
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
