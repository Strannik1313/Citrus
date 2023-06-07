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
import { MatIconModule } from '@angular/material/icon';
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
		MatButtonModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
