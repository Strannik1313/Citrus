import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@shared/calendar/calendar.component';
import { AddClassDirective } from './add-class.directive';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
	declarations: [CalendarComponent, AddClassDirective],
	imports: [CommonModule, DirectivesModule],
	exports: [CalendarComponent],
})
export class CalendarModule {}
