import { MatButtonModule } from '@angular/material/button';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from '@components/ui/header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';
import { SpinnerModule } from '@components/ui/spinner/spinner.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnakeBarModule } from '@shared/sneakbar/snake-bar.module';
import { MainFeature } from '@state-management/main-feature/main.reducer';
import { ErrorHandlerInterceptor } from '@interceptors/error-handler.interceptor';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MainPageModule } from '@components/ui/main-page/main-page.module';
import { AuthModule } from '@shared/auth/auth.module';
import { TokenInterceptor } from '@interceptors/token.interceptor';

registerLocaleData(localeRu);

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatIconModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatButtonModule,
		SpinnerModule,
		SnakeBarModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreModule.forFeature(MainFeature.name, MainFeature.reducer),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		MatProgressSpinnerModule,
		MatTooltipModule,
		MainPageModule,
		AuthModule,
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'ru' },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorHandlerInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
