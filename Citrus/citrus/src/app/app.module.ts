import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MainPageLayoutComponent } from './mainPage/components/main-page-layout/main-page-layout.component';
import { MainPageLayoutHeaderComponent } from './mainPage/components/main-page-layout-header/main-page-layout-header.component';
import { MainPageLayoutFooterComponent } from './mainPage/components/main-page-layout-footer/main-page-layout-footer.component';
import { AppButtonModule } from './shared/app-button-wrapper/app-button/app-button.module';
import { AppButtonWrapperComponent } from './shared/app-button-wrapper/app-button-wrapper.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,

    MainPageLayoutComponent,
    MainPageLayoutHeaderComponent,
    MainPageLayoutFooterComponent,
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
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
