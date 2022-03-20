import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateChoiceLayoutComponent } from './date-choice-layout/date-choice-layout.component';
import { CalendarComponent, ExampleHeader } from './date-choice-layout/components/calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { CustomDateAdapter } from '../CustomDateAdapter';
import { AppButtonModule } from '../shared/app-button-wrapper/app-button/app-button.module';



@NgModule({
  declarations: [
    DateChoiceLayoutComponent,
    CalendarComponent,
    ExampleHeader,
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    RouterModule.forChild([
      {path:'', component: DateChoiceLayoutComponent}
    ])
    
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ]
})
export class DateChoicePageModule { }
