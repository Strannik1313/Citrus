import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainPageLayoutComponent } from '@components/ui/main-page-layout/main-page-layout.component';
import { WizardAccessGuard } from '@guards/wizard-access.guard.service';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

const routes: Routes = [
	{
		path: '',
		component: MainPageLayoutComponent,
		pathMatch: 'full',
	},
	{
		path: 'deal',
		loadChildren: () => import('@components/ui/wizard/wizard.module').then(m => m.WizardModule),
		canActivate: [WizardAccessGuard],
	},
	{
		path: 'auth',
		loadChildren: () => import('@components/shared/auth/auth.module').then(m => m.AuthModule),
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
		StoreRouterConnectingModule.forRoot(),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
