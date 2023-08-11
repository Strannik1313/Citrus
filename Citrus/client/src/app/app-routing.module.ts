import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WizardAccessGuard } from '@guards/wizard-access.guard.service';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MainPageContainerComponent } from '@components/ui/main-page/main-page-container/main-page-container.component';
import { AuthPageComponent } from '@shared/auth/auth-page/auth-page.component';
import { AuthAccessGuard } from '@guards/auth-access-guard.service';

const routes: Routes = [
	{
		path: '',
		component: MainPageContainerComponent,
		pathMatch: 'full',
	},
	{
		path: 'deal',
		loadChildren: () => import('@components/ui/wizard/wizard.module').then(m => m.WizardModule),
		canActivate: [WizardAccessGuard],
	},
	{
		path: 'auth',
		component: AuthPageComponent,
		canActivate: [AuthAccessGuard],
	},
	{
		path: 'auth/login',
		component: AuthPageComponent,
		canActivate: [AuthAccessGuard],
	},
	{
		path: 'auth/register',
		component: AuthPageComponent,
		canActivate: [AuthAccessGuard],
	},
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
