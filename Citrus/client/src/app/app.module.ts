import { MatButtonModule } from '@angular/material/button';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from 'src/app/app.component';
import { MainPageLayoutComponent } from '@components/ui/main-page-ui/main-page-layout.component';
import { HeaderWrapperComponent } from '@components/header-wrapper/header-wrapper.component';
import { MainPageLayoutWrapperComponent } from '@components/main-page-layout-wrapper/main-page-layout-wrapper.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppButtonGroupModule } from '@shared/app-button-group/app-button-group.module';
import { DialogWindowModule } from '@shared/dialog-window/dialog-window.module';
import { SpinnerModule } from '@shared/spinner/spinner.module';
import { httpInterceptorProviders } from '@intercepters/http-intercepter-providers';
import { MatIconModule } from '@angular/material/icon';
import { SPINNER_DURATION, SPINNER_TIME } from 'src/app/InjectionsToken/InjectionToken';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';

registerLocaleData(localeRu);

@NgModule({
	declarations: [AppComponent, MainPageLayoutComponent, HeaderWrapperComponent, MainPageLayoutWrapperComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatIconModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppButtonGroupModule,
		MatButtonModule,
		DialogWindowModule,
		SpinnerModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [
		httpInterceptorProviders,
		{ provide: LOCALE_ID, useValue: 'ru' },
		{ provide: SPINNER_TIME, useValue: SPINNER_DURATION },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
