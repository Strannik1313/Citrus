import { AppButtonGroupModule } from './shared/app-button-group/app-button-group.module';
import { MatButtonModule } from '@angular/material/button';
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
import { HeaderWrapperComponent } from './components/wrappers/header-wrapper/header-wrapper.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './components/custom-components-material-ui/custom-paginators-label/CustomPaginatorsLabel';
import { MainPageLayoutWrapperComponent } from './components/wrappers/main-page-layout-wrapper/main-page-layout-wrapper.component';
import localeRu from '@angular/common/locales/ru';
import { httpInterceptorProviders } from './intercepters/http-intercepter-providers';
import { SPINNER_TIME } from './InjectionsToken/InjectionToken';
import { SpinnerModule } from './shared/spinner/spinner.module';
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    MainPageLayoutComponent,
    HeaderWrapperComponent,
    MainPageLayoutWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppButtonGroupModule,
    MatButtonModule,
    DialogWindowModule,
    SpinnerModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
    { provide: SPINNER_TIME, useValue: 300 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
