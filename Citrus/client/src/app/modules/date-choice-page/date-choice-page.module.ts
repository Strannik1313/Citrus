import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateChoiceLayoutComponent } from '../../components/ui/date-choice-ui/date-choice-layout/date-choice-layout.component';
import { CalendarComponent } from '../../components/ui/date-choice-ui/calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { CustomDateAdapter } from '../../components/ui/date-choice-ui/CustomDateAdapter';
import { AppButtonModule } from '../../shared/app-button-wrapper/app-button.module';
import { CustomCalendarHeader } from '../../components/ui/date-choice-ui/custom-calendar-header/custom-calendar-header.component';
import { DateChoiceWrapperComponent } from '../../components/wrappers/date-choice-wrapper/date-choice-wrapper.component';
import { MatButtonModule } from '@angular/material/button';
import { ColonPipe } from '../../pipes/colon.pipe';


@NgModule({
  declarations: [
    DateChoiceLayoutComponent,
    CalendarComponent,
    CustomCalendarHeader,
    DateChoiceWrapperComponent,
    ColonPipe
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    RouterModule.forChild([
      {path:'', component: DateChoiceWrapperComponent}
    ])
    
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ]
})
export class DateChoicePageModule { }
