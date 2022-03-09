import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent, ExampleHeader } from './components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarItemComponent } from './components/calendar-item/calendar-item.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CustomDateAdapter } from './CustomDateAdapter';
import { MainPageModule } from './mainPage/main-page.module';
import { MainPageLayoutComponent } from './mainPage/components/main-page-layout/main-page-layout.component';
import { MainPageLayoutHeaderComponent } from './mainPage/components/main-page-layout-header/main-page-layout-header.component';
import { MainPageLayoutFooterComponent } from './mainPage/components/main-page-layout-footer/main-page-layout-footer.component';
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarItemComponent,
    ExampleHeader,

    MainPageLayoutComponent,
    MainPageLayoutHeaderComponent,
    MainPageLayoutFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MainPageModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
