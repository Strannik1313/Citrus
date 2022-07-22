import { MatButtonModule } from '@angular/material/button';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import { MatPaginatorIntl } from '@angular/material/paginator';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from 'src/app/app.component';
import { MainPageLayoutComponent } from '@components/ui/main-page-ui/main-page-layout.component';
import { HeaderWrapperComponent } from '@components/wrappers/header-wrapper/header-wrapper.component';
import { MainPageLayoutWrapperComponent } from '@components/wrappers/main-page-layout-wrapper/main-page-layout-wrapper.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppButtonGroupModule } from '@shared/app-button-group/app-button-group.module';
import { DialogWindowModule } from '@shared/dialog-window/dialog-window.module';
import { SpinnerModule } from '@shared/spinner/spinner.module';
import { httpInterceptorProviders } from '@intercepters/http-intercepter-providers';
import { MatPaginatorIntlCro } from '@components/custom-components-material-ui/custom-paginators-label/CustomPaginatorsLabel';
import { MatIconModule } from '@angular/material/icon';
import {
	SPINNER_DURATION,
	SPINNER_TIME,
} from 'src/app/InjectionsToken/InjectionToken';
registerLocaleData(localeRu);

@NgModule({
	declarations: [
		AppComponent,
		MainPageLayoutComponent,
		HeaderWrapperComponent,
		MainPageLayoutWrapperComponent,
	],
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
	],
	providers: [
		httpInterceptorProviders,
		{ provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
		{ provide: LOCALE_ID, useValue: 'ru' },
		{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
		{ provide: SPINNER_TIME, useValue: SPINNER_DURATION },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
