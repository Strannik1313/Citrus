import { AdHostModule } from './modules/ad-host/ad-host.module';
import { DialogWindowModule } from './shared/dialog-window/dialog-window.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import { MainPageLayoutComponent } from './components/ui/main-page-ui/main-page-layout.component';
import { MainPageHeaderLayoutComponent } from './components/ui/main-page-header-ui/main-page-header-layout.component';
import { AppButtonModule } from './shared/app-button-wrapper/app-button.module';
import { HeaderWrapperComponent } from './components/wrappers/header-wrapper/header-wrapper.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './components/custom-components-material-ui/custom-paginators-label/CustomPaginatorsLabel';
import { MainPageLayoutWrapperComponent } from './components/wrappers/main-page-layout-wrapper/main-page-layout-wrapper.component';
import localeRu from '@angular/common/locales/ru';
import { httpInterceptorProviders } from './intercepters/http-intercepter-providers';
import { ErrorWindowWrapperComponent } from './components/wrappers/error-window-wrapper/error-window-wrapper.component';
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    MainPageLayoutComponent,
    MainPageHeaderLayoutComponent,
    HeaderWrapperComponent,
    MainPageLayoutWrapperComponent,
    ErrorWindowWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppButtonModule,
    DialogWindowModule,
    AdHostModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
