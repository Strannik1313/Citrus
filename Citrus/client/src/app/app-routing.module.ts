import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainPageLayoutComponent } from '@components/ui/main-page-layout/main-page-layout.component';
import { AccessGuard } from './guard/access.guard';

const routes: Routes = [
	{
		path: '',
		component: MainPageLayoutComponent,
		pathMatch: 'full',
	},
	{
		path: 'deal',
		loadChildren: () => import('@components/ui/wizard/wizard.module').then(m => m.WizardModule),
		canActivate: [AccessGuard],
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
