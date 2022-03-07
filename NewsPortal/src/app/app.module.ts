import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewssectionComponent } from './newssection/newssection.component';
import { OldnewssectionComponent } from './oldnewssection/oldnewssection.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './navbar/logo/logo.component';
import { InfoComponent } from './navbar/info/info.component';
import { ViewselectorComponent } from './navbar/viewselector/viewselector.component';
import { AfishaComponent } from './navbar/afisha/afisha.component';
import { RadioComponent } from './navbar/radio/radio.component';
import { ThrowawayComponent } from './navbar/throwaway/throwaway.component';
import { EdaComponent } from './navbar/eda/eda.component';
import { ContactsComponent } from './navbar/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewssectionComponent,
    OldnewssectionComponent,
    FooterComponent,
    LogoComponent,
    InfoComponent,
    ViewselectorComponent,
    AfishaComponent,
    RadioComponent,
    ThrowawayComponent,
    EdaComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
