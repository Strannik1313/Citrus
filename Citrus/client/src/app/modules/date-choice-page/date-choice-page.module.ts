import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DateChoiceLayoutComponent } from '@components/ui/date-choice-ui/layout/date-choice-layout.component';
import { CalendarComponent } from '@components/ui/date-choice-ui/calendar/calendar.component';
import { CustomCalendarHeader } from '@components/custom-components-material-ui/custom-calendar-header/custom-calendar-header.component';
import { DateChoiceWrapperComponent } from '@components/wrappers/date-choice-page-wrapper/date-choice-page-wrapper.component';
import { ColonPipe } from '@pipes/colon.pipe';
import { AppButtonGroupModule } from '@shared/app-button-group/app-button-group.module';
import { CustomDateAdapter } from '@components/custom-components-material-ui/custom-date-adapter/CustomDateAdapter';

@NgModule({
	declarations: [
		DateChoiceLayoutComponent,
		CalendarComponent,
		CustomCalendarHeader,
		DateChoiceWrapperComponent,
		ColonPipe,
	],
	imports: [
		CommonModule,
		AppButtonGroupModule,
		MatButtonModule,
		MatDatepickerModule,
		MatCardModule,
		MatNativeDateModule,
		RouterModule.forChild([
			{ path: '', component: DateChoiceWrapperComponent },
		]),
	],
	providers: [{ provide: DateAdapter, useClass: CustomDateAdapter }],
})
export class DateChoicePageModule {}
