import { MatButtonModule } from '@angular/material/button';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from 'src/app/app.component';
import { MainPageLayoutComponent } from '@components/ui/main-page-layout/main-page-layout.component';
import { HeaderComponent } from '@components/ui/header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';
import { SpinnerModule } from '@components/ui/spinner/spinner.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

registerLocaleData(localeRu);

@NgModule({
	declarations: [AppComponent, MainPageLayoutComponent, HeaderComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatIconModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatButtonModule,
		SpinnerModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		MatProgressSpinnerModule,
	],
	providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
