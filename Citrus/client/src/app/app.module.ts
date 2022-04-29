import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MainPageLayoutComponent } from './mainPage/main-page-layout/main-page-layout.component';
import { MainPageLayoutHeaderComponent } from './mainPage/header-wrapper/main-page-layout-header/main-page-layout-header.component';
import { AppButtonModule } from './shared/app-button-wrapper/app-button.module';
import { TokenInterceptor } from './services/token-interceptor';
import { HeaderWrapperComponent } from './mainPage/header-wrapper/header-wrapper.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    MainPageLayoutComponent,
    MainPageLayoutHeaderComponent,
    HeaderWrapperComponent,
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
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
