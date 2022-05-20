import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import { MainPageLayoutComponent } from './components/ui/main-page-ui/main-page-layout.component';
import { MainPageHeaderLayoutComponent } from './components/ui/main-page-header-ui/main-page-header-layout.component';
import { AppButtonModule } from './shared/app-button-wrapper/app-button.module';
import { TokenInterceptor } from './services/token-interceptor';
import { HeaderWrapperComponent } from './components/wrappers/header-wrapper/header-wrapper.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './components/custom-components-material-ui/custom-paginators-label/CustomPaginatorsLabel';
import { MainPageLayoutWrapperComponent } from './components/wrappers/main-page-layout-wrapper/main-page-layout-wrapper.component';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    MainPageLayoutComponent,
    MainPageHeaderLayoutComponent,
    HeaderWrapperComponent,
    MainPageLayoutWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppButtonModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
